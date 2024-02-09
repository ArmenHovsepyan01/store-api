import { body } from "express-validator";

export const validateProductCreateBody = [
    body("name", "Name can't be empty.").notEmpty(),
    body("description", "Description can't be empty.").notEmpty(),
    body("price", "Price can't be empty.").notEmpty(),
    body("brand", "Brand can't be empty.").notEmpty()
];