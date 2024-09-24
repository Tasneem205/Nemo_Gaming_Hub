import { Router } from "express";
import getFunctions from "../services/games.services.js"

const gamesRouter = new Router();

gamesRouter.get("/", getFunctions.getAll);

gamesRouter.get("/last", getFunctions.getLast);


export default gamesRouter;