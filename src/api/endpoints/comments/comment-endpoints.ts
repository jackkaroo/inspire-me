import {Application} from 'express';
import {createCommentHandler} from './create-comment/handler';
import {getCommentByIdHandler} from './get-comment-by-id/handler';
import {getCommentsHandler} from './get-comments/handler';

const path = '/comments';

export function initCommentEndpoints(app: Application): void {
  app.get(path, getCommentsHandler);
  app.get(`${path}/:commentId`, getCommentByIdHandler);
  app.post(path, createCommentHandler);
}
