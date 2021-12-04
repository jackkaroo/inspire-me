import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../interfaces';

export const bodySchema: Schema = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', format: 'password'},
  },

  required: ['email', 'password'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
