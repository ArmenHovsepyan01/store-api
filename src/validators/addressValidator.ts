import { body } from 'express-validator';

export const validateAddressBody = [
  body('country', "Country can't be empty.").notEmpty(),
  body('state', "State can't be empty.").notEmpty(),
  body('city', "City can't be empty.").notEmpty(),
  body('zip_code', "Zip code can't be empty.").notEmpty(),
  body('street_address', "Street address can't be empty.").notEmpty()
];
