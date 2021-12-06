import {Schema} from 'ajv';
import {RequestValidationSchemas} from '../../../../types';
import {NumericId} from '../../../utils/validator';

const bodySchema: Schema = {
  type: 'object',
  properties: {
    challengeId: NumericId,
  },
  required: ['challengeId'],
  additionalProperties: false,
};

export const schema: RequestValidationSchemas = {body: bodySchema};
