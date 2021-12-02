import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const {commentId} = req.params;
  const comment = await prisma.comment.findUnique({
    where: {id: parseInt(commentId)},
  });

  if (!comment) {
    throw createHttpError(404, 'Comment not found');
  }

  logger.info('Fetched comment from DB with id:', {message: commentId});

  res.send(comment);
}

export const getCommentByIdHandler = wrapHandler(handler);
