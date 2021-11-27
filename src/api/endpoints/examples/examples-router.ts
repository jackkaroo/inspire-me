import express from 'express';
import {sayGoodbyeHandler} from './say-goodbye/handler';
import {sayHelloHandler} from './say-hello/handler';

const examplesRouter = express.Router();

examplesRouter.get('/say-hello', sayHelloHandler);
examplesRouter.get('/say-goodbye', sayGoodbyeHandler);

export default examplesRouter;
