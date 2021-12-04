import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {AuthenticatedRequest} from '../../../../interfaces';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {title, description, deadline, parentId} = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(500, 'Auth was not set the for endpoint.');
  }

  const challenge = await prisma.$transaction(async prisma => {
    const content = await createContent('CHALLENGE', prisma);

    return await prisma.challenge.create({
      data: {
        title,
        description,
        deadline,
        parentId,
        id: content.id,
        userId: userId,
      },
    });
  });

  logger.info('Inserted new challenge into DB');

  res.send(challenge);
}

export const createChallengeHandler = wrapHandler(handler, schema);
