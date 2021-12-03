import {Application} from 'express';
import {getUserByIdHandler} from './get-user-by-id/handler';
import {getUsersHandler} from './get-users/handler';

const path = '/users';

export function initUserEndpoints(app: Application): void {
  app.get(path, getUsersHandler);
  app.get(`${path}/:userId`, getUserByIdHandler);
}
