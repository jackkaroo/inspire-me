import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {NumericId} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    whomId: NumericId,
  },
  required: ['whomId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {body: bodySchema};
