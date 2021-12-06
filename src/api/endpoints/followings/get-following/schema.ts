import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {regex} from '../../../utils/validator';

const querySchema: Schema = {
  type: 'object',
  properties: {
    whoId: {type: 'string', pattern: regex.id},
    whomId: {type: 'string', pattern: regex.id},
  },
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  query: querySchema,
};
