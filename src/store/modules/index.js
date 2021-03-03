import {user} from "@/api";

const state = {
  userInfo: {}
};

const actions = {
  async getUserInfo({commit}) {
    const res = await user.getUserInfo();
    commit('updateUserInfo', res.result);
  }
}

const mutations = {
  updateUserInfo(state, data) {
    state.userInfo = data
  }
}

export default {
  namespace: true,
  state,
  actions,
  mutations,
}
