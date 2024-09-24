import { Router } from "express";
import getFunctions from "../services/posts.services.js"

const postsRouter = new Router();

postsRouter.get("/", getFunctions.getAll);

postsRouter.get("/last", getFunctions.getLast);


export default postsRouter;