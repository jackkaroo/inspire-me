import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const whomId = parseInt(req.body.whomId as string);
  const following = await prisma.following.create({data: {whoId: userId, whomId: whomId}});

  res.send(following);
}

export const addFollowingHandler = wrapHandler(handler, schema);
