import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    name: {type: 'string', isNotEmpty: true},
    email: {type: 'string', format: 'email'},
    avatarId: {type: ['number', 'null'], minimum: 1},
  },
  minProperties: 1,
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
