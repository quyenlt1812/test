import Api, {RequestMethod} from '../Api';
import {handleServerMessage} from '../../utils/MessageHelper';

class PostRepo {
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

  async getCommentsRepo({postId, offset}) {
    try {
      const resp = await Api({
        url: `/posts/${postId}/comments`,
        method: RequestMethod.GET,
        params: {
          limit: 11,
          offset,
        },
      });
      return resp.data;
    } catch (error) {
      console.error(handleServerMessage(error));
    }
  }

  async sendCommentsRepo({postId, content}) {
    console.log('RecognitionRepo -> sendCommentsRepo -> postId', postId);
    try {
      const resp = await Api({
        url: `/posts/${postId}/comments`,
        method: RequestMethod.POST,
        data: {
          content,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(
        'RecognitionRepo -> getCommentsRepo -> error',
        JSON.parse(JSON.stringify(error)),
      );
    }
  }

  async getCommentersRepo({postId, offset, limit = 11}) {
    try {
      const resp = await Api({
        url: `/posts/${postId}/commenters`,
        method: RequestMethod.GET,
        params: {
          offset,
          limit,
        },
      });
      return resp.data;
    } catch (error) {
      return handleServerMessage(error);
    }
  }

  async getReacteesRepo({postId, offset, limit = 11}) {
    try {
      const resp = await Api({
        url: `/posts/${postId}/reactees`,
        method: RequestMethod.GET,
        params: {
          offset,
          limit,
        },
      });
      return resp.data;
    } catch (error) {
      return handleServerMessage(error);
    }
  }
}

export default new PostRepo();
