import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {title, description, deadline, parentId} = req.body;

  const challenge = await prisma.$transaction(async prisma => {
    const content = await createContent('CHALLENGE', prisma);

    return await prisma.challenge.create({
      //TODO add userId from auth data
      data: {
        title,
        description,
        deadline,
        parentId,
        id: content.id,
        userId: -1,
      },
    });
  });

  logger.info('Inserted new challenge into DB');

  res.send(challenge);
}

export const createChallengeHandler = wrapHandler(handler, schema);
