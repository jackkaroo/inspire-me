import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {regex} from '../../../utils/validator';

const querySchema: Schema = {
  type: 'object',
  properties: {
    userId: {type: 'string', pattern: regex.id},
    challengeId: {type: 'string', pattern: regex.id},
  },
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  query: querySchema,
};
