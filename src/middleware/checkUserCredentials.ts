import { NextFunction, Request, Response } from "express";

export const checkUserCredentials = (req: Request, res: Response, next: NextFunction) => {
    // TODO: not only gmail
    // TODO: change variable name
    const regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+(@gmail.com)$/gmi;

    if(!req.body) {
        return res.status(400).send("The request body is missing.")
    }

    const requiredFields = req.url.includes('login') ? ["email", "password"] : ["firstName", "lastName", "email", "password"];
    const missingFields  = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({error: `Missing fields: ${missingFields.join(', ')}`});
    }

    if(!req.body.email.match(regexp)) {
        return res.status(400).json({error: `Email don't match :: ${req.body.email}`});
    }

    next();
}