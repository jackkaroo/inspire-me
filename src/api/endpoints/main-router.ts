import express from 'express';
import examplesRouter from './examples/examples-router';

const mainRouter = express.Router();

mainRouter.use('/examples', examplesRouter);

export default mainRouter;
