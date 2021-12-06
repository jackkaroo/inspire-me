import {Application} from 'express';
import {authenticate} from '../../middlewares/auth/authenticate/handler';
import {createCommentHandler} from './create-comment/handler';
import {deleteCommentHandler} from './delete-comment/handler';
import {getCommentByIdHandler} from './get-comment-by-id/handler';
import {getCommentsHandler} from './get-comments/handler';
import {updateCommentHandler} from './update-comment/handler';

const path = '/comments';

export function initCommentEndpoints(app: Application): void {
  app.use(path, authenticate);
  app.get(path, getCommentsHandler);
  app.get(`${path}/:id`, getCommentByIdHandler);
  app.post(path, createCommentHandler);
  app.patch(`${path}/:id`, updateCommentHandler);
  app.delete(`${path}/:id`, deleteCommentHandler);
}
