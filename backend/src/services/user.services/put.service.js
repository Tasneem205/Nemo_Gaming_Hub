import responses from "../../middlewares/responses.js";
import { MongoClient, ObjectId } from 'mongodb';

const updateUser = async function (req, res, next) {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            // Access the database
            const db = client.db(process.env.DBName);
            const userId = req.params.id;
            const updateData = req.body; // Assuming the update data is sent in the request body

            // Perform operations on the database here
            const usersCollection = db.collection('Users');

            if (!ObjectId.isValid(userId)) {
                return responses.notFound(res, "User not found");
            }

            // Remove fields that shouldn't be updated directly
            delete updateData._id;
            delete updateData.password; // Assuming password update should be handled separately

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: updateData }
            );

            if (result.matchedCount === 0) {
                responses.notFound(res, "User not found");
            } else if (result.modifiedCount === 0) {
                responses.success(res, "No changes made to the user", null);
            } else {
                const updatedUser = await usersCollection.findOne({ _id: new ObjectId(userId) });
                const { password, ...userProfile } = updatedUser;
                responses.success(res, "User updated successfully", userProfile);
            }
        } catch (err) {
            console.error("Error updating user: ", err);
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

export default updateUser;