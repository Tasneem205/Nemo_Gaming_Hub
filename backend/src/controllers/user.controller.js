import { Router } from "express";
import deleteAccount from "../services/user.services/delete.service.js";
import profile from "../services/user.services/get.service.js";
import updateUser from "../services/user.services/put.service.js";

const userRouter = new Router();

userRouter.get("/:id", profile);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteAccount);

export default userRouter;