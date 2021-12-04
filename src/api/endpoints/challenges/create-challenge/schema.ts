import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../interfaces';

const bodySchema: Schema = {
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

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
