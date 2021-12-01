import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    email: {type: 'string'},
  },
  required: ['name', 'email'],
  additionalProperties: false,
};
