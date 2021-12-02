import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', format: 'password'},
  },

  required: ['email', 'password'],
  additionalProperties: false,
};
