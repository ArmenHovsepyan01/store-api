import { IProduct } from "../definitions";

export const createValuesFromReqBody = (fields: IProduct) => {
  const values = {};
  for (const fieldsKey in fields) {
    values[fieldsKey] = fields[fieldsKey];
  }

  return values;
};
