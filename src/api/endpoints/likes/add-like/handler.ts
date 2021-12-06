import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const contentId = parseInt(req.body.contentId as string);
  const like = await prisma.like.create({data: {contentId: contentId, userId: userId}});

  res.send(like);
}

export const addLikeHandler = wrapHandler(handler, schema);
