import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {contentId, text, commentId} = req.body;
  const userId = unwrapUserData(req).id;

  const comment = await prisma.comment.create({
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
