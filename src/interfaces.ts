import {Request} from 'express';

export type AuthenticatedRequest = {
  user?: {
    id: number;
    role: string;
  };
} & Request;

export type UserJwtInfo = {
  id: number;
  role: string;
};

export default AuthenticatedRequest;
