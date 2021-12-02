import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    contentId: {type: 'number', min: 1},
    commentId: {type: 'number', min: 1},
    text: {type: 'string', isNotEmpty: 'true'},
  },

  required: ['text', 'contentId'],
  additionalProperties: false,
};
