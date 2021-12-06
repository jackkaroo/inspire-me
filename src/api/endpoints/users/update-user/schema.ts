import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {IdParamSchema} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    name: {type: 'string', isNotEmpty: true},
    email: {type: 'string', format: 'email'},
    avatarId: {type: ['number', 'null'], minimum: 1},
  },
  minProperties: 1, //anyOf: [{required: ['title']}, {required: ['description']}, {required: ['deadline']}],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
  params: IdParamSchema,
};
