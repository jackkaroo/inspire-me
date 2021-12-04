import {Request} from 'express';
import {Schema} from 'ajv';

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

export type RequestValidationSchemas = {
  body?: Schema;
  query?: Schema;
  params?: Schema;
};
