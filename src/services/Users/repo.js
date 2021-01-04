import {handleServerMessage} from '../../utils/MessageHelper';
import Api, {RequestMethod} from '../Api';

class UsersRepo {
  async uploadAvatarRepo({file, userId}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const resp = await Api({
        url: `/users/${userId}/avatar/upload`,
        method: RequestMethod.POST,
        data: formData,
      });
      return resp.data;
    } catch (error) {
      console.error('UsersRepo -> uploadAvatarRepo -> error', error);
      throw new Error(handleServerMessage(error));
    }
  }

  async updateUserRepo({userId, user}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/profile/update`,
        method: RequestMethod.POST,
        data: {
          ...user,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async searchPeersRepo({searchText, offset, limit = 11}) {
    try {
      const resp = await Api({
        url: '/users/search',
        method: RequestMethod.GET,
        params: {
          search: searchText,
          offset,
          limit,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getUserProfileRepo({userId}) {
    try {
      if (userId) {
        const resp = await Api({
          url: `/users/${userId}/profile`,
          method: RequestMethod.GET,
        });
        return resp.data;
      }
    } catch (error) {
      console.error('getUserProfileRepo -> error', error);
    }
  }

  async getColleaguesRepo({userId, offset}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/colleagues`,
        method: RequestMethod.GET,
        params: {
          limit: 11,
          offset,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async changePasswordRepo({userId, newPassword}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/change-password`,
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

  async getUserRewardsRepo({userId, offset, limit = 10}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/rewards`,
        method: RequestMethod.GET,
        params: {
          offset,
          limit,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }
}

export default new UsersRepo();
