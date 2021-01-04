import Api, {RequestMethod} from '../Api';
import {handleServerMessage} from '../../utils/MessageHelper';

class AuthRepo {
  async signInRepo({email, password}) {
    try {
      const resp = await Api({
        url: '/users/sign-in',
        method: RequestMethod.POST,
        data: {
          email: email.toLowerCase(),
          password,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async signUpRepo({name, email, password, confirmPassword}) {
    try {
      const resp = await Api({
        url: '/users/sign-up',
        method: RequestMethod.POST,
        data: {
          name,
          email,
          password,
          confirm_password: confirmPassword,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async resetPasswordRepo(email) {
    try {
      const resp = await Api({
        url: '/users/reset-password',
        method: RequestMethod.POST,
        data: {
          email,
        },
      });
      return resp.data;
    } catch (error) {
      console.error('resetPasswordRepo -> error', error);
      throw new Error(handleServerMessage(error));
    }
  }

  async changePasswordRepo(userId, newPassword) {
    try {
      const resp = await Api({
        url: `/users​/${userId}​/change-password`,
        method: RequestMethod.POST,
        data: {
          new_password: newPassword,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }
}

export default new AuthRepo();
