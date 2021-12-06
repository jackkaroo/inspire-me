import Ajv, {Schema} from 'ajv';
import AjvFormats from 'ajv-formats';

const validator = new Ajv();

validator.addKeyword({
  keyword: 'isNotEmpty',
  type: 'string',
  validate: (schema: any, data: any) => typeof data === 'string' && data.trim() !== '',
});

AjvFormats(validator);

export const ajv = validator;

export const regex = {
  id: '[1-9][0-9]*',
  idOrNull: '([1-9][0-9]*)|null',
};

export const IdParamSchema: Schema = {
  type: 'object',
  properties: {
    id: {type: 'string', pattern: regex.id},
  },
  required: ['id'],
  additionalProperties: false,
};

export const NumericId = {type: 'number', minimum: 1};
