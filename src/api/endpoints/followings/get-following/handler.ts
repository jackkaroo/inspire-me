import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

type QueryParams = {
  whoId?: number;
  whomId?: number;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const where: QueryParams = {};
  const {whoId, whomId} = req.query;

  if (whoId) {
    where.whoId = parseInt(whoId as string);
  }

  if (whomId) {
    where.whomId = parseInt(whomId as string);
  }

  const followings = await prisma.following.findMany({
    where: where,

    include: {whom: {select: {name: true}}},
  });
  logger.info('Fetched followings from DB');

  res.send(followings);
}

export const getFollowingsHandler = wrapHandler(handler, schema);
