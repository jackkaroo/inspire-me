import Ajv from 'ajv';
import AjvFormats from 'ajv-formats';

const validator = new Ajv();
export const ajv = validator;

validator.addKeyword({
  keyword: 'isNotEmpty',
  type: 'string',
  validate: (schema: any, data: any) => typeof data === 'string' && data.trim() !== '',
});

AjvFormats(validator);
