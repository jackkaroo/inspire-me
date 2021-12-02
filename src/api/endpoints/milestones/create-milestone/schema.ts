import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    text: {type: 'string', isNotEmpty: true},
    challengeId: {type: 'string'},
  },

  required: ['text', 'challengeId'],
  additionalProperties: false,
};
