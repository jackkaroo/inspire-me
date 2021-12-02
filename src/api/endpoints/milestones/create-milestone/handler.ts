import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {createContent} from '../../../../dal/content';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {text, challengeId} = req.body;

  const milestone = await prisma.$transaction(async prisma => {
    const content = await createContent('MILESTONE', prisma);

    return await prisma.milestone.create({
      //TODO add userId from auth data
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
