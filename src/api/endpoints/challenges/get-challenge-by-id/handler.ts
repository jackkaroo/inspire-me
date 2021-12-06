import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const challenge = await prisma.challenge.findUnique({
    where: {id: parseInt(id)},
  });

  if (!challenge) {
    throw createHttpError(404, 'Challenge not found');
  }

  logger.info('Fetched challenge from DB with id:', {message: id});

  res.send(challenge);
}

export const getChallengeByIdHandler = wrapHandler(handler, {params: IdParamSchema});
