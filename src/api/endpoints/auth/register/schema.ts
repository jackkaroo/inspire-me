import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    email: {type: 'string', format: 'email', isNotEmpty: true},
    password: {type: 'string', format: 'password', isNotEmpty: true},
  },

  required: ['name', 'email', 'password'],
  additionalProperties: false,
};
