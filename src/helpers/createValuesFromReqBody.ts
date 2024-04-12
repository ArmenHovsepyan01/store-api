import { IProduct, ProductUpdateFields } from '../definitions';
import { AddressesInput } from '../database/models/addresses';

export const createValuesFromReqBody = (fields: IProduct | AddressesInput) => {
  const values = {};
  for (const fieldsKey in fields) {
    values[fieldsKey] = fields[fieldsKey];
  }

  return values as ProductUpdateFields;
};
