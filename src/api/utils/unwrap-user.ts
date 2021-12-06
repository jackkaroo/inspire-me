import createHttpError from 'http-errors';
import {AuthenticatedRequest} from '../../types';
import {UserDto} from '../dto/user-dto';

export default function unwrapUserData(req: AuthenticatedRequest): UserDto {
  const {user} = req;

  if (!user || !user.id) {
    throw createHttpError(
      500,
      'No user data. Auth middleware is configured incorrectly for this endpoint.'
    );
  }

  return user;
}
