import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const comments = await prisma.challenge.findMany();
  //TODO add fetch by user Id & challengeId
  logger.info('Fetched comments from DB');

  res.send(comments);
}

export const getCommentsHandler = wrapHandler(handler);
