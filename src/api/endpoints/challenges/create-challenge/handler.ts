import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {title, description, deadline, parentId} = req.body;
  const userId = unwrapUserData(req).id;

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
