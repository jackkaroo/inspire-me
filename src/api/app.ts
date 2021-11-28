import express from 'express';
import {initEndpoints} from './endpoints/endpoints';
import {initRequestMiddlewares} from './middlewares/request';
import {initResponseMiddlewares} from './middlewares/response';

const app = express();

initRequestMiddlewares(app);
initEndpoints(app);
initResponseMiddlewares(app);

export {app};
