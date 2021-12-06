import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {UserDto} from '../../../dto/user-dto';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {userSelect} from '../inputs/select-input';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;

  const updateResult: UserDto = await prisma.user.update({
    where: {id: userId},
    data: req.body,
    select: userSelect,
  });

  logger.info('Updated user: ', {message: userId});
  res.send(updateResult);
}

export const updateUserHandler = wrapHandler(handler, schema);
