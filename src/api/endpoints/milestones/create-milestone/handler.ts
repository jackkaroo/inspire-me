import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import AuthenticatedRequest from '../../../../interfaces';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {text, challengeId} = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(500, 'Auth was not set the for endpoint.');
  }

  const milestone = await prisma.$transaction(async prisma => {
    const challenge = await prisma.challenge.findMany({where: {id: challengeId, userId: userId}});

    if (!challenge) {
      throw createHttpError(400, 'Provided challenge does not exist/belong to current user.');
    }

    const content = await createContent('MILESTONE', prisma);

    return await prisma.milestone.create({
      data: {
        text,
        challengeId,
        id: content.id,
      },
    });
  });

  logger.info('Inserted new milestone into DB');

  res.send(milestone);
}

export const createMilestoneHandler = wrapHandler(handler, schema);
