import { body } from 'express-validator';

export const validateLoginFields = [
  body('email', 'Mail is invalid please type valid one.').isEmail(),
  body('password', 'Password length should be at least 4.').notEmpty().isLength({ min: 4 })
];
