import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {regex} from '../../../utils/validator';

const querySchema: Schema = {
  userId: {type: 'string', pattern: regex.id},
  challengeId: {type: 'string', pattern: regex.id},
};

export const schema: RequestValidationSchemas = {
  query: querySchema,
};
