import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {IdParamSchema} from '../../../utils/validator';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {text, challengeId} = req.body;
  const userId = unwrapUserData(req).id;

  const milestone = await prisma.$transaction(async prisma => {
    const challenge = await prisma.challenge.findUnique({where: {id: challengeId}});

    if (!challenge || challenge.userId !== userId) {
      throw createHttpError(400, 'Provided challenge does not exist/belong to current user.');
    }

    const content = await createContent('MILESTONE', prisma);

    return await prisma.milestone.create({
      data: {
        text,
        challengeId,
        id: content.id,
        userId: userId,
      },
    });
  });

  logger.info('Inserted new milestone into DB', {params: IdParamSchema});

  res.send(milestone);
}

export const createMilestoneHandler = wrapHandler(handler, schema);
