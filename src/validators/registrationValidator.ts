import { body } from "express-validator";

export const validateRegisterFields = [
    body("firstName", "Please fill first name field.").notEmpty().isString(),
    body("lastName", "Please fill last name field.").notEmpty().isString(),
    body("email", "Mail is invalid please type valid one.").isEmail(),
    body("password", "Password length should be at least 4.").notEmpty().isLength({min: 4}),
];