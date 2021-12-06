import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {NumericId} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    title: {type: 'string', isNotEmpty: true},
    description: {type: 'string', isNotEmpty: true},
    deadline: {type: 'string', format: 'date'},
    parentId: NumericId,
  },

  required: ['title', 'description'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
};
