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

  if (!user || !bcrypt.compareSync(password, user.hash)) {
    throw createHttpError(401, 'Wrong credentials.');
  }

  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw createHttpError(502, 'Authentication impossible due to incorrect server configuration');
  }

  //TODO add moderator
  const token = jwt.sign({role: 'user', id: user.id}, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h',
  });

  logger.info('User logged in', {email: email});

  res.send({token});
}

export const loginHandler = wrapHandler(handler, schema);
