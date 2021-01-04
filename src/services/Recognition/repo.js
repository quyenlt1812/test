import Api, {RequestMethod} from '../Api';
import {handleServerMessage} from '../../utils/MessageHelper';

class RecognitionRepo {
  async sendRecognitionRepo({userId, recognition}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/recognitions/send`,
        method: RequestMethod.POST,
        data: recognition,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getSentRecognitionsRepo({userId, offset, limit}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/recognitions/send?offset=${offset}&limit=${limit}`,
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getReceivedRecognitionsRepo({userId, offset, limit}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/recognitions/receive?offset=${offset}&limit=${limit}`,
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getPostRepo({offset}) {
    try {
      const resp = await Api({
        url: '/posts',
        method: RequestMethod.GET,
        params: {
          limit: 10,
          offset,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getRecognitionsRepo({offset}) {
    try {
      const resp = await Api({
        url: '/recognitions',
        method: RequestMethod.GET,
        params: {
          limit: 10,
          offset,
        },
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getTopValuesRepo({userId}) {
    try {
      const resp = await Api({
        url: `/users/${userId}/recognitions/top-values`,
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getRecognitionBadgesRepo() {
    try {
      const resp = await Api({
        url: '/recognition_badges',
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }

  async getRecognitionImagesRepo() {
    try {
      const resp = await Api({
        url: '/recognition_images',
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      throw new Error(handleServerMessage(error));
    }
  }
}

export default new RecognitionRepo();
