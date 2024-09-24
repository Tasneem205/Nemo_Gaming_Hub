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
            const gamesCollection = db.collection('Games');

            // Find all games
            const games = await gamesCollection.find({}).toArray();
            return responses.success(res, "All games", games);
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
            const gamesCollection = db.collection('Games');

            // Find all games
            const randomGames = await gamesCollection.aggregate([{ $sample: { size: 6 } }]).toArray();
            return responses.success(res, "last games", randomGames);
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