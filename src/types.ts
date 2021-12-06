import {Request} from 'express';
import {Schema} from 'ajv';
import {UserDto} from './api/dto/user-dto';

export type AuthenticatedRequest = {
  user?: UserDto;
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
