const {handleServerMessage} = require('../../utils/MessageHelper');
const {default: Api, RequestMethod} = require('../Api');

class RewardRepo {
  async getCollectionsRepo() {
    try {
      const resp = await Api({
        url: '/rewards/collections',
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      console.error('RewardRepo -> getCategoriesRepo -> error', error);
      throw new Error(handleServerMessage(error));
    }
  }

  async getAllRewardsRepo() {
    try {
      const resp = await Api({
        url: '/rewards',
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      console.error('RewardRepo -> getAllRewardsRepo -> error', error);
    }
  }

  async getProductsByCollectionRepo({collectionId}) {
    try {
      const resp = await Api({
        url: `/rewards/collections/${collectionId}/rewards`,
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      console.error('RewardRepo -> getProductsByCategoryRepo -> error', error);
    }
  }

  async getRewardDetailRepo({rewardId}) {
    try {
      const resp = await Api({
        url: `/rewards/${rewardId}`,
        method: RequestMethod.GET,
      });
      return resp.data;
    } catch (error) {
      console.error('getRewardDetailRepo -> error', error);
    }
  }

  async claimRewardRepo({rewardId}) {
    try {
      const resp = await Api({
        url: `/rewards/${rewardId}/buy`,
        method: RequestMethod.POST,
      });
      return resp.data;
    } catch (error) {
      console.error('claimRewardRepo -> error', error);
    }
  }
}

export default new RewardRepo();
