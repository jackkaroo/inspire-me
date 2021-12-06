import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {regex} from '../../../utils/validator';

const querySchema: Schema = {
  whoId: {type: 'string', pattern: regex.id},
  whomId: {type: 'string', pattern: regex.id},
};

export const schema: RequestValidationSchemas = {
  query: querySchema,
};
