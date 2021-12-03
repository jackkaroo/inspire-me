import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {name, email, password} = req.body;
  const existingUser = await prisma.user.findUnique({where: {email: email}});

  if (existingUser) {
    throw createHttpError(400, `User with email ${email} already exists.`);
  }

  const hash: string = await bcrypt.hash(password, 13);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hash,
      role: 'USER',
    },
  });
  logger.info('Inserted new user into DB');

  res.send(user);
}

export const registerHandler = wrapHandler(handler, schema);
