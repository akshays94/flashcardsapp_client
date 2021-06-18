import Vue from "vue";
import Vuex from "vuex";

import { loginAPI, validateTokenAPI } from "@/endpoints/auth";
import {
  getDecksAPI,
  getDeckCardsAPI,
  createDeckAPI,
  createCardInDeckAPI,
} from "@/endpoints/deck";

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

    isCardSidebarOpen: false,
    selectedCard: {
      title: "",
      content: "",
    },

    isCardFormSidebarOpen: false,
    formCard: {
      title: "",
      content: "",
    },
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

    getIsCardSidebarOpen: (state) => state.isCardSidebarOpen,
    getSelectedCardTitle: (state) => state.selectedCard.title,
    getSelectedCardContent: (state) => state.selectedCard.content,

    getIsCardFormSidebarOpen: (state) => state.isCardFormSidebarOpen,
    getFormCardTitle: (state) => state.formCard.title,
    getFormCardContent: (state) => state.formCard.content,
  },

  mutations: {
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState());
    },

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
    ADD_CARD_TO_DECK: (state, payload) => {
      const cards = [...state.deckCards];
      cards.push(payload);
      Vue.set(state, "deckCards", cards);
    },

    SET_IS_CARD_SIDEBAR_OPEN: (state, payload) =>
      (state.isCardSidebarOpen = payload),
    SET_SELECTED_CARD_TITLE: (state, payload) =>
      (state.selectedCard.title = payload),
    SET_SELECTED_CARD_CONTENT: (state, payload) =>
      (state.selectedCard.content = payload),

    SET_IS_CARD_FORM_SIDEBAR_OPEN: (state, payload) =>
      (state.isCardFormSidebarOpen = payload),
    SET_FORM_CARD_TITLE: (state, payload) => (state.formCard.title = payload),
    SET_FORM_CARD_CONTENT: (state, payload) =>
      (state.formCard.content = payload),
  },

  actions: {
    async authLogin({ commit }, payload) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Logging in ...`,
        type: "is-success",
      });
      const response = await loginAPI(payload);
      if (response.status === 200) {
        const { access_token, user } = response["data"];
        commit("SET_AUTH_TOKEN", access_token);
        commit("SET_AUTH_USER", user);
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
        return { success: true };
      }
      return { success: false };
    },

    authLogout({ commit }) {
      commit("RESET_STATE");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

    resetDeckCards({ commit }) {
      commit("SET_IS_DECK_CARDS_LOADED", false);
      commit("SET_DECK_CARDS", []);
    },

    openSelectedCard({ commit }, payload) {
      const { title, content } = payload;
      commit("SET_SELECTED_CARD_TITLE", title);
      commit("SET_SELECTED_CARD_CONTENT", content);
      commit("SET_IS_CARD_SIDEBAR_OPEN", true);
    },

    closeSelectedCard({ commit }) {
      commit("SET_SELECTED_CARD_TITLE", "");
      commit("SET_SELECTED_CARD_CONTENT", "");
      commit("SET_IS_CARD_SIDEBAR_OPEN", false);
    },

    openCardFormForAdd({ commit }) {
      commit("SET_IS_CARD_FORM_SIDEBAR_OPEN", true);
    },

    closeCardFormForAdd({ commit }) {
      commit("SET_IS_CARD_FORM_SIDEBAR_OPEN", false);
      commit("SET_FORM_CARD_TITLE", "");
      commit("SET_FORM_CARD_CONTENT", "");
    },

    async createCardInDeck({ getters, commit, dispatch }, deckId) {
      const title = getters["getFormCardTitle"];
      const content = getters["getFormCardContent"];
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Creating card ... Please wait ...`,
        type: "is-success",
      });
      const response = await createCardInDeckAPI(deckId, {
        title,
        content,
      });
      if (response.status === 200) {
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
        dispatch("closeCardFormForAdd");
        commit("ADD_CARD_TO_DECK", response.data);
      }
    },
  },
});
