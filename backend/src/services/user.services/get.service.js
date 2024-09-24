import responses from "../../middlewares/responses.js";
import { MongoClient } from 'mongodb';

const profile = async function (req, res, next) {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            // Access the database
            const db = client.db(process.env.DBName);
            const userId = req.params.id;
            // Perform operations on the database here
            const usersCollection = db.collection('Users');

            if (!ObjectId.isValid(userId)) {
                return responses.notFound(res, "User not found");
            }

            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
            if (user) {
                // Remove sensitive information before sending the response
                const { password, ...userProfile } = user;
                responses.success(res, "user profile found", userProfile);
            } else {
                responses.notFound(res, "User not found");
            }
        } catch (err) {
            console.error("Error fetching user profile: ", err);
            res.internalServerError(res, "internal server error");
        } finally {
            await client.close();
            next();
        }
    }catch(e) {
        console.log("can't connect");
    }
}

export default profile;