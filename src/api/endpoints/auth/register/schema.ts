import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    name: {type: 'string', isNotEmpty: true},
    email: {type: 'string', format: 'email', isNotEmpty: true},
    password: {type: 'string', format: 'password', isNotEmpty: true},
  },

  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
