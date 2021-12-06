import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {deleteUserHandler} from './delete-user/handler';
import {getUserByIdHandler} from './get-user-by-id/handler';
import {getUsersHandler} from './get-users/handler';
import {updateUserHandler} from './update-user/handler';

const path = '/users';

export function initUserEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getUsersHandler);
  app.get(`${path}/:id`, getUserByIdHandler);
  app.patch(path, updateUserHandler);
  app.delete(path, deleteUserHandler);
}
