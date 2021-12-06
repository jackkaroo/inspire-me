import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const comment = await prisma.comment.findUnique({
    where: {id: parseInt(id)},
  });

  if (!comment) {
    throw createHttpError(404, 'Comment not found');
  }

  logger.info('Fetched comment from DB with id:', {message: id});

  res.send(comment);
}

export const getCommentByIdHandler = wrapHandler(handler, {params: IdParamSchema});
