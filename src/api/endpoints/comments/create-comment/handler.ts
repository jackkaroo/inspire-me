import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../interfaces';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {contentId, text, commentId} = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(500, 'Auth was not set the for endpoint.');
  }

  const comment = await prisma.comment.create({
    //TODO add userId from auth data
    data: {
      contentId,
      text,
      commentId,
      userId: userId,
    },
  });

  logger.info('Inserted new comment into DB');

  res.send(comment);
}

export const createCommentHandler = wrapHandler(handler, schema);
