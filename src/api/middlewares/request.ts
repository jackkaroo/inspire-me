import bodyParser from 'body-parser';
import cors from 'cors';
import {Application} from 'express';

export function initRequestMiddlewares(app: Application): void {
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
    })
  );
}
