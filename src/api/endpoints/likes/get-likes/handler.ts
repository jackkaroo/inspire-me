import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

type QueryParams = {
  contentId?: number;
  userId?: number;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const where: QueryParams = {};
  const {contentId, userId} = req.query;

  if (contentId) {
    where.contentId = parseInt(contentId as string);
  }

  if (userId) {
    where.userId = parseInt(userId as string);
  }

  const likes = await prisma.like.findMany({where: where});
  logger.info('Fetched likes from DB');

  res.send(likes);
}

export const getLikesHandler = wrapHandler(handler, schema);
