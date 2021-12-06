import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';

export const bodySchema: Schema = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email', isNotEmpty: true},
    password: {type: 'string', format: 'password', isNotEmpty: true},
  },

  required: ['email', 'password'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
