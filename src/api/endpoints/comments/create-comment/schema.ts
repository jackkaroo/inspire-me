import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {NumericId} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    contentId: NumericId,
    commentId: NumericId,
    text: {type: 'string', isNotEmpty: true},
  },

  required: ['text', 'contentId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
