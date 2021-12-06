import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {IdParamSchema} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    text: {type: 'string', isNotEmpty: true},
  },
  minProperties: 1,
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  body: bodySchema,
  params: IdParamSchema,
};
