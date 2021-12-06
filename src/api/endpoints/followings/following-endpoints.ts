import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {addFollowingHandler} from './add-following/handler';
import {deleteFollowingHandler} from './delete-following/handler';
import {getFollowingByIdHandler} from './get-following-by-id/handler';
import {getFollowingsHandler} from './get-following/handler';

const path = '/followings';

export function initFollowingEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getFollowingsHandler);
  app.get(`${path}/:id`, getFollowingByIdHandler);
  app.post(path, addFollowingHandler);
  app.delete(`${path}/:id`, deleteFollowingHandler);
}
