import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {Application} from 'express';
import {expressLogger} from '../../logger/logger';

export function initRequestMiddlewares(app: Application): void {
  app.use(expressLogger);
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(cookieParser());
}
