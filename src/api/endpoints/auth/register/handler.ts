import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {UserDto} from '../../../dto/user-dto';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {userSelect} from '../../users/inputs/select-input';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {name, email, password} = req.body;
  const existingUser = await prisma.user.findUnique({where: {email: email}});

  if (existingUser) {
    throw createHttpError(409, `User with email ${email} already exists.`);
  }

  const hash: string = await bcrypt.hash(password, 13);
  const user: UserDto = await prisma.user.create({
    data: {
      email,
      name,
      hash,
      role: 'USER',
    },
    select: userSelect,
  });
  logger.info('Inserted new user into DB with id', {message: user.id});

  res.send(user);
}

export const registerHandler = wrapHandler(handler, schema);
