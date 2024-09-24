import responses from "../../middlewares/responses.js";
import { MongoClient } from 'mongodb';

const deleteAccount = async function (req, res, next) {
    try{
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
            const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
            if (result.deletedCount === 1) {
              console.log("Successfully deleted one user.");
              return responses.success(res, "All posts", deleteuser);
            } else {
              console.log("No users matched the query. Deleted 0 users.");
              return false;
            }
        } catch (err) {
            console.error(err);
        } finally {
            // Close the client
            await client.close();
            next();
        }
    }catch(e) {
        console.log("can't connect");
    }
}

export default deleteAccount;