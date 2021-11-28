import {Application} from 'express';
import {handleError} from './error-handler';

export function initResponseMiddlewares(app: Application): void {
  app.use(handleError);
}
