import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../database/models/models';

import sendRegistrationVerificationMail from './email.service';
import { createUserParams } from '../definitions';

class UserService {
  async getUser(id: number) {
    try {
      const user = await User.findByPk(id);

      if (!user) throw new Error(`There is no user by this mail.`);

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(body: createUserParams) {
    try {
      const { firstName, lastName, password, email, role } = body;

      const isUserExists = await User.findOne({
        where: {
          email: email
        }
      });

      if (isUserExists && !isUserExists.dataValues.isVerified)
        throw new Error(
          'You already have register with this email please verify your account or wait 5 minute to register again.'
        );

      if (isUserExists && isUserExists.dataValues.isVerified)
        throw new Error(
          'You already have have an account please log in or use another mail for register.'
        );

      const hashedPassword = await bcrypt.hash(password, 7);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      });

      const info = await sendRegistrationVerificationMail(email, newUser.id);

      return {
        user: newUser,
        info: info
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
          id: decoded.id
        }
      });

      if (!user.dataValues.isVerified) {
        await user.update({ isVerified: true });
        return 'User verified successfully.';
      }

      return 'User is already verified.';
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

      if (!user)
        throw new Error(
          'There is no account with such mail please pass registration and verification.'
        );

      if (!user.dataValues.isVerified) throw new Error("User isn't verified.");

      const comparePasswords = await bcrypt.compare(password, user.dataValues.password);

      if (!comparePasswords) throw new Error('Password is incorrect.');

      const token = jwt.sign({ id: user.id }, process.env.SECRETKEY);

      return {
        message: 'User logged in.',
        access_token: token
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new UserService();
