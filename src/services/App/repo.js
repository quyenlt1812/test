import Api, {RequestMethod} from '../Api';
import {handleServerMessage} from '../../utils/MessageHelper';

class AppRepo {
  async checkAppVersionRepo() {
    try {
      const resp = await Api({
        url: '/app/version',
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      console.log('AppRepo -> checkAppVersionRepo -> error', error);
      handleServerMessage(error);
    }
  }
}

export default new AppRepo();
