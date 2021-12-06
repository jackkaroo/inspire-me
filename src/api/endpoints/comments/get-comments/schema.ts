import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {regex} from '../../../utils/validator';

const querySchema: Schema = {
  type: 'object',
  properties: {
    contentId: {type: 'string', pattern: regex.id},
    commentId: {type: 'string', pattern: regex.idOrNull},
  },

  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {
  query: querySchema,
};
