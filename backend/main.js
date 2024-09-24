import Express from 'express';
import router from "./src/controllers/index.controller.js"
import dotenv from "dotenv";
import errorHandler from "./src/middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors"

const app = Express();
app.use(cors());
dotenv.config();
app.use(Express.json());  // parser
app.use(morgan("dev"));
app.use("/ngh", router);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
