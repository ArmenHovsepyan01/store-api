import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Product from "../db/models/Product";
import User from "../db/models/User";

import sendRegistrationVerificationMail from "./email.service";
import { createUserParams, UserInterface } from "../definitions";

class UserService {
  async getUser(email: string) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) throw new Error(`There is no user by this mail ${email}`);

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
  async createUser(body: createUserParams) {
    try {
      const { firstName, lastName, password, email } = body;

      const isUserExists = await User.findOne({
        where: {
          email: email,
        },
      });

      if (isUserExists && !isUserExists.dataValues.isVerified)
        throw new Error(
          "You already have register with this email please verify your account or wait 5 minute to register again.",
        );

      if (isUserExists && isUserExists.dataValues.isVerified)
        throw new Error(
          "You already have have an account please log in or use another mail for register.",
        );

      const hashedPassword = await bcrypt.hash(password, 7);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });

      const info = await sendRegistrationVerificationMail(email);

      return {
        user: newUser,
        info: info,
      };
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async verifyUser(token: any) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRETKEY);
      const user = await User.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (!user.dataValues.isVerified) {
        await user.update({ isVerified: true });
        return "User verified successfully.";
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
          email: email,
        },
      });

      if (!user)
        throw new Error(
          "There is no account with such mail please pass registration and verification.",
        );

      if (!user.dataValues.isVerified) throw new Error("User isn't verified.");

      const comparePasswords = await bcrypt.compare(
        password,
        user.dataValues.password,
      );

      if (!comparePasswords) throw new Error("Password is incorrect.");

      const token = jwt.sign({ email }, process.env.SECRETKEY);

      return {
        message: "User logged in.",
        access_token: token,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new UserService();
