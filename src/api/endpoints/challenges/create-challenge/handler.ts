import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {title, description, deadline, parentId} = req.body;
  const userId = unwrapUserData(req).id;

  if (parentId) {
    const parent = await prisma.challenge.findUnique({
      where: {id: parentId},
      select: {userId: true, parentId: true},
    });

    if (!parent) {
      throw createHttpError(404, 'Provided parent challenge not found');
    }

    if (parent.parentId !== null) {
      throw createHttpError(403, 'Can not create subchallenge for subchallenge');
    }

    if (parent.userId !== userId) {
      throw createHttpError(403, 'Can not create subchallenge for challenge user doesnt own');
    }
  }

  const challenge = await prisma.$transaction(async prisma => {
    const content = await createContent('CHALLENGE', prisma);

    return await prisma.challenge.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
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
