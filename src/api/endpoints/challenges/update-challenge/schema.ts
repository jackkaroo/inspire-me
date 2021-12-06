import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {IdParamSchema} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    title: {type: 'string', isNotEmpty: true},
    description: {type: 'string', isNotEmpty: true},
    deadline: {type: 'string', format: 'date'},
  },
  minProperties: 1, //anyOf: [{required: ['title']}, {required: ['description']}, {required: ['deadline']}],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
  params: IdParamSchema,
};
