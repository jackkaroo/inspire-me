import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {UserDto} from '../../../dto/user-dto';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {userSelect} from '../inputs/select-input';

async function handler(req: Request, res: Response): Promise<void> {
  const users: UserDto[] = await prisma.user.findMany({select: userSelect});
  logger.info('Fetched users from DB');

  res.send(users);
}

export const getUsersHandler = wrapHandler(handler);
