import express from 'express';

import bodyParser from 'body-parser';

import cors from 'cors';

import db, { connectToDB } from './database/config/database';

import router from './router/router';

const app = express();
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectToDB();
    app.listen(5555, () => console.log(`Express server is listening at http://localhost:${port}`));
  } catch (e) {
    throw e;
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', express.static('public'));
app.use(express.json());
// app.use('/api', router);

start();
