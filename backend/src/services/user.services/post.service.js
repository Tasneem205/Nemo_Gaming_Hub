import responses from "../../middlewares/responses.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async (req, res, next) => {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            // Access the database
            const db = client.db(process.env.DBName);
            const { username, password } = req.body;

            // Perform operations on the database here
            const usersCollection = db.collection('Users');

            // Find user by username
            const user = await usersCollection.findOne({ username });

            if (!user) {
                return responses.notFound(res, "User not found");
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return responses.unauthorized(res, "Invalid credentials");
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Update last login
            await usersCollection.updateOne(
                { _id: user._id },
                { $set: { lastLogin: new Date() } }
            );

            const { password: _, ...userWithoutPassword } = user;
            
            responses.success(res, "Login successful", { user: userWithoutPassword, token });
        } catch (err) {
            console.error("Error logging in: ", err);
            responses.internalServerError(res, "Internal server error");
        } finally {
            await client.close();
            next();
        }
    } catch(e) {
        console.log("Can't connect to database");
        responses.internalServerError(res, "Database connection error");
    }
};

const register = async function (req, res, next) {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            // Access the database
            const db = client.db(process.env.DBName);
            const { username, email, password } = req.body;

            // Perform operations on the database here
            const usersCollection = db.collection('Users');

            // Check if user already exists
            const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return responses.conflict(res, "Username or email already exists");
            }

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new user
            const newUser = {
                username,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const result = await usersCollection.insertOne(newUser);

            if (result.insertedId) {
                const { password, ...userWithoutPassword } = newUser;
                responses.created(res, "User registered successfully", userWithoutPassword);
            } else {
                responses.internalServerError(res, "Failed to register user");
            }
        } catch (err) {
            console.error("Error registering user: ", err);
            responses.internalServerError(res, "Internal server error");
        } finally {
            await client.close();
            next();
        }
    } catch(e) {
        console.log("Can't connect to database");
        responses.internalServerError(res, "Database connection error");
    }
}

const postFuntions = {
    login,
    register
};

export default postFuntions;