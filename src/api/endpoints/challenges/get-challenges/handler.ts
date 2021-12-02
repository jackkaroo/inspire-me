import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const challenges = await prisma.challenge.findMany();
  //TODO add fetch by user Id & parentId
  logger.info('Fetched challenges from DB');

  res.send(challenges);
}

export const getChallengesHandler = wrapHandler(handler);
