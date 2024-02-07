import express from "express";

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

app.use(express.json());
app.use("/api", router);

start();