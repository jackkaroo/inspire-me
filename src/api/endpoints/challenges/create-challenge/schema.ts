import {Schema} from 'ajv';

export const schema: Schema = {
  type: 'object',
  properties: {
    title: {type: 'string', isNotEmpty: true},
    description: {type: 'string', isNotEmpty: true},
    deadline: {type: 'string', format: 'date'},
    parentId: {type: 'number', minimum: 1},
  },

  required: ['title', 'description'],
  additionalProperties: false,
};
