import responses from "../middlewares/responses.js";
import { MongoClient } from 'mongodb';

const getAll = async function (req, res, next) {
    try{
        const client = new MongoClient('mongodb://localhost:27017');

        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');

            // Access the database
            const db = client.db(process.env.DBName);

            // Perform operations on the database here
            const postsCollection = db.collection('BlogPosts');
            const posts = await postsCollection.find({}).toArray();
            return responses.success(res, "All posts", posts);
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

const getLast = async function (req, res, next) {
    try{
        const client = new MongoClient('mongodb://localhost:27017');

        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');

            // Access the database
            const db = client.db(process.env.DBName);

            // Perform operations on the database here
            const postsCollection = db.collection('BlogPosts');

            // Find all games
            const randomposts = await postsCollection.aggregate([{ $sample: { size: 3 } }]).toArray();
            return responses.success(res, "last posts", randomposts);
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

const getFunctions = {
    getAll,
    getLast
}

export default getFunctions;