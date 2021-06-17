import Vue from "vue";
import Vuex from "vuex";

import { loginAPI, validateTokenAPI } from "@/endpoints/auth";
import { getDecksAPI, getDeckCardsAPI, createDeckAPI } from "@/endpoints/deck";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    auth: {
      token: null,
      user: null,
    },
    isDecksLoaded: false,
    decks: [],
    isDeckCardsLoaded: false,
    deckCards: [],
  };
};

export default new Vuex.Store({
  state: getDefaultState(),

  getters: {
    getName: (state) => (state.auth.user ? state.auth.user.name : ""),
    hasToken: (state) => state.auth.token !== null,
    getIsDecksLoaded: (state) => state.isDecksLoaded,
    getDecks: (state) => state.decks,
    getIsDeckCardsLoaded: (state) => state.isDeckCardsLoaded,
    getDeckCards: (state) => state.deckCards,
  },

  mutations: {
    SET_AUTH_TOKEN: (state, token) => {
      Vue.set(state.auth, "token", token);
    },
    SET_AUTH_USER: (state, user) => {
      Vue.set(state.auth, "user", user);
    },
    SET_IS_DECKS_LOADED: (state, payload) => (state.isDecksLoaded = payload),
    SET_DECKS: (state, payload) => (state.decks = payload),
    ADD_DECK_CARD: (state, payload) => {
      const decks = [...state.decks];
      decks.unshift(payload);
      Vue.set(state, "decks", decks);
    },
    SET_IS_DECK_CARDS_LOADED: (state, payload) =>
      (state.isDeckCardsLoaded = payload),
    SET_DECK_CARDS: (state, payload) => (state.deckCards = payload),
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

    async loadDecks({ commit }) {
      commit("SET_IS_DECKS_LOADED", false);
      commit("SET_DECKS", []);
      const response = await getDecksAPI();
      if (response.status === 200) {
        commit("SET_IS_DECKS_LOADED", true);
        commit("SET_DECKS", response.data);
      }
    },

    async loadDeckCards({ commit }, deckId) {
      commit("SET_IS_DECK_CARDS_LOADED", false);
      commit("SET_DECK_CARDS", []);
      const response = await getDeckCardsAPI(deckId);
      if (response.status === 200) {
        commit("SET_IS_DECK_CARDS_LOADED", true);
        commit("SET_DECK_CARDS", response.data);
      }
    },

    async createDeck({ commit }, payload) {
      const { title } = payload;
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Creating deck ... Please wait ...`,
        type: "is-success",
      });
      const response = await createDeckAPI({ title });
      if (response.status === 200) {
        const newCard = response.data;
        commit("ADD_DECK_CARD", newCard);
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
      }
    },
  },
});
