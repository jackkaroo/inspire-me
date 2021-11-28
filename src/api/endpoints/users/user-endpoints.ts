import {Application} from 'express';
import {createUserHandler} from './create-user/handler';
import {getUserByIdHandler} from './get-user-by-id/handler';
import {getUsersHandler} from './get-users/handler';

export function initUserEndpoints(app: Application): void {
  app.get('/users', getUsersHandler);
  app.get('/users/:userId', getUserByIdHandler);
  app.post('/users', createUserHandler);
}
