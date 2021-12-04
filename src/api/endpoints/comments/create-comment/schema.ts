import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../interfaces';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    contentId: {type: 'number', min: 1},
    commentId: {type: 'number', min: 1},
    text: {type: 'string', isNotEmpty: 'true'},
  },

  required: ['text', 'contentId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
