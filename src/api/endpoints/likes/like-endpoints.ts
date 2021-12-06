import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {addLikeHandler} from './add-like/handler';
import {deleteLikeHandler} from './delete-like/handler';
import {getLikeByIdHandler} from './get-like-by-id/handler';
import {getLikesHandler} from './get-likes/handler';

const path = '/likes';

export function initLikeEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getLikesHandler);
  app.get(`${path}/:id`, getLikeByIdHandler);
  app.post(path, addLikeHandler);
  app.delete(`${path}/:id`, deleteLikeHandler);
}
