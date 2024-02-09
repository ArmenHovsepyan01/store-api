import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import { connectToDB } from "./config/database";

import router from "./routes/routes";


const app = express();
const port = process.env.PORT || 5001;

const start = async () => {
    try{
        await connectToDB();
        app.listen(port, () => console.log(`Express server is listening at http://localhost:${port}`));
    } catch (e) {
        throw new Error(e);
    }
};

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

start();