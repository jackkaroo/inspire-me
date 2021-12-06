import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {NumericId} from '../../../utils/validator';

export const bodySchema: Schema = {
  type: 'object',
  properties: {
    text: {type: 'string', isNotEmpty: true},
    challengeId: NumericId,
  },

  required: ['text', 'challengeId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
