import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {contentId, text, commentId} = req.body;

  const comment = await prisma.comment.create({
    //TODO add userId from auth data
    data: {
      contentId,
      text,
      commentId,
      userId: -1,
    },
  });

  logger.info('Inserted new comment into DB');

  res.send(comment);
}

export const createCommentHandler = wrapHandler(handler, schema);
