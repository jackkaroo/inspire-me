import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const userId = unwrapUserData(req).id;
  const comment = await prisma.comment.findUnique({where: {id: id}});

  if (!comment) {
    throw createHttpError(404, 'Comment not found');
  }

  if (comment.userId !== userId) {
    throw createHttpError(403, 'Current user does not own the comment.');
  }

  const deletionResult = await prisma.comment.delete({where: {id: id}});

  logger.info('Deleted comment from DB with id:', {message: id});

  res.send(deletionResult);
}

export const deleteCommentHandler = wrapHandler(handler, {params: IdParamSchema});
