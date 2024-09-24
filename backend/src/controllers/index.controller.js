import { Router } from "express";
import postFuntions from "../services/user.services/post.service.js"
import postsRouter from "./posts.controller.js";
import gamesRouter from "./games.controller.js";
import userRouter from "./user.controller.js";


const router = new Router();

router.post("/login", postFuntions.login)

router.post("/register", postFuntions.register);

router.use("/posts", postsRouter);

router.use("/games", gamesRouter);

router.use("/user", userRouter);

export default router;