import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const commentId = parseInt(req.params.id);
  const comment = await prisma.comment.findUnique({where: {id: commentId}});

  if (!comment) {
    throw createHttpError(404, 'Comment not found.');
  }

  if (comment.userId !== userId) {
    throw createHttpError(403, 'Comment is not owned by current user');
  }

  const updateResult = await prisma.comment.update({
    where: {id: commentId},
    data: req.body,
  });

  logger.info('Updated comment: ', {message: commentId});
  res.send(updateResult);
}

export const updateCommentHandler = wrapHandler(handler, schema);
