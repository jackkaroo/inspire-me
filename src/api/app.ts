import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mainRouter from './endpoints/main-router';
import {handleError} from './error-handler';

const app = express();

//Request middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

// API endpoints
app.use('/', mainRouter);

//Response middlewares
app.use(handleError);

export {app};
