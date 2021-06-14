import Vue from "vue";
import Vuex from "vuex";

import { loginAPI, validateTokenAPI } from "@/endpoints/auth";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    auth: {
      token: null,
      user: null,
    },
  };
};

export default new Vuex.Store({
  state: getDefaultState(),

  getters: {
    getName: (state) => (state.auth.user ? state.auth.user.name : ""),
    hasToken: (state) => state.auth.token !== null,
  },

  mutations: {
    SET_AUTH_TOKEN: (state, token) => {
      Vue.set(state.auth, "token", token);
    },
    SET_AUTH_USER: (state, user) => {
      Vue.set(state.auth, "user", user);
    },
  },

  actions: {
    async authLogin({ commit }, payload) {
      const response = await loginAPI(payload);
      if (response.status === 200) {
        const { access_token, user } = response["data"];

        commit("SET_AUTH_TOKEN", access_token);
        commit("SET_AUTH_USER", user);
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true };
      }
      return { success: false };
    },

    async authSetUserFromToken({ commit }) {
      try {
        const response = await validateTokenAPI();
        if (response.status === 200) {
          commit("SET_AUTH_TOKEN", localStorage.getItem("token"));
          commit("SET_AUTH_USER", response.data);
          return { success: true };
        }
        return { success: false };
      } catch (e) {
        return { success: false };
      }
    },
  },
});
