import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

type QueryParams = {
  contentId?: number;
  commentId?: number | null;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const where: QueryParams = {};
  const {contentId, commentId} = req.query;

  if (contentId) {
    where.contentId = parseInt(req.query.contentId as string);
  }

  if (commentId) {
    where.commentId = commentId === 'null' ? null : parseInt(commentId as string);
  }

  const comments = await prisma.comment.findMany({where: where});
  logger.info('Fetched comments from DB');

  res.send(comments);
}

export const getCommentsHandler = wrapHandler(handler, schema);
