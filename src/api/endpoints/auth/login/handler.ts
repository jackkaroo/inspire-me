import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {email, password} = req.body;

  const user = await prisma.user.findUnique({where: {email: email}});

  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw createHttpError(401, 'Wrong credentials.');
  }

  const secret = process.env.SECRET;

  if (!secret) {
    throw createHttpError(500, 'Improper server config. Please contact admin.');
  }

  //TODO add moderator
  const token = jwt.sign({role: 'user', id: user.id}, secret, {
    expiresIn: '1h',
  });

  logger.info('User logged in', {id: user.id, email: email});

  res.cookie('Authorization', token, {secure: true, httpOnly: true});
  res.send();
}

export const loginHandler = wrapHandler(handler, schema);
