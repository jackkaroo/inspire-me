import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

type QueryParams = {
  parentId?: number | null;
  userId?: number;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const {parentId, userId} = req.query;
  const where: QueryParams = {};

  if (parentId) {
    where.parentId = parentId === 'null' ? null : parseInt(parentId as string);
  }

  if (userId) {
    where.userId = parseInt(userId as string);
  }

  const challenges = await prisma.challenge.findMany({
    where: where,
  });
  logger.info('Fetched challenges from DB');

  res.send(challenges);
}

export const getChallengesHandler = wrapHandler(handler, schema);
