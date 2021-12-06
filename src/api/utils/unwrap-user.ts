import createHttpError from 'http-errors';
import {AuthenticatedRequest} from '../../types';

export default function unwrapUserData(req: AuthenticatedRequest): {
  id: number;
  role: string;
  email: string;
} {
  const {user} = req;

  if (!user || !user.id) {
    throw createHttpError(
      500,
      'No user data. Auth middleware is configured incorrectly for this endpoint.'
    );
  }

  return user;
}
