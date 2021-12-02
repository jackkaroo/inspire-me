import {Application} from 'express';
import {createCommentHandler} from './create-comment/handler';
import {getCommentByIdHandler} from './get-comment-by-id/handler';
import {getCommentsHandler} from './get-comments/handler';

export function initCommentEndpoints(app: Application): void {
  app.get('/comments', getCommentsHandler);
  app.get('/comments/:commentId', getCommentByIdHandler);
  app.post('/comments', createCommentHandler);
}
