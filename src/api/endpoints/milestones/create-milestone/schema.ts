import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../interfaces';

export const bodySchema: Schema = {
  type: 'object',
  properties: {
    text: {type: 'string', isNotEmpty: true},
    challengeId: {type: 'string'},
  },

  required: ['text', 'challengeId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
