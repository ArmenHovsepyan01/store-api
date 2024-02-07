import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

import sendRegistrationVerificationMail from "./EmailService";

import {createUserParams, UserInterface} from "../definitions";
class UserService {
    async getAllUsers(){
        try {
            return await User.findAll();
        } catch (e){
            throw new Error(e);
        }
    }
    async createUser(body: createUserParams) {
        try {
            const { firstName, lastName, password, email} = body;
            const hashedPassword= await bcrypt.hash(password, 7);

            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            const info = await sendRegistrationVerificationMail(email);

            return {
                user: newUser,
                info: info
            };
        } catch (e){
            throw new Error(e.errors[0].message);
        }
    }

    async verifyUser(token: any){
        try {
            const decoded = await jwt.verify(token, process.env.SECRETKEY);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            });

            if(!user.dataValues.isVerified) {
                await user.update({isVerified: true});
                return "User verified successfully."
            }

            return "User is already verified.";
        } catch (e) {
            throw new Error(e);
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if(!user) throw new Error("There is no user with such email.");

            if(!user.dataValues.isVerified) throw new Error("User isn't verified.");

            const comparePasswords = await bcrypt.compare(password, user.dataValues.password);

            if(!comparePasswords) throw new Error("Password is incorrect.");

            const token = jwt.sign({ email }, process.env.SECRETKEY);

            return {
                message: "User logged in.",
                access_token: token
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new UserService();