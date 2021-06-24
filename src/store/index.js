import Vue from "vue";
import Vuex from "vuex";

import { registerAPI, loginAPI, validateTokenAPI } from "@/endpoints/auth";
import {
  getDecksAPI,
  retrieveDeckAPI,
  getDeckCardsAPI,
  getDeckSessionsAPI,
  createDeckAPI,
  createCardInDeckAPI,
  startRevisionAPI,
  retrieveSessionAPI,
  getNextCardAPI,
  moveCardAPI,
  markSessionAsCompleteAPI,
  deleteDeckAPI,
  deleteCardAPI,
  updateDeckAPI,
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

    deck: null,

    isDeckCardsLoaded: false,
    deckCards: [],

    isDeckSessionsLoaded: false,
    deckSessions: [],

    isCardSidebarOpen: false,
    selectedCard: {
      title: "",
      content: "",
    },

    isCardUpdateCase: false,
    isCardFormSidebarOpen: false,
    formCard: {
      title: "",
      content: "",
    },

    session: {
      id: null,
      title: null,
      date: null,
      deck_id: null,
    },

    sessionNextCard: null,
    isSessionLoadingNewCard: true,
  };
};

export default new Vuex.Store({
  state: getDefaultState(),

  getters: {
    getName: (state) => (state.auth.user ? state.auth.user.name : ""),
    hasToken: (state) => state.auth.token !== null,

    getIsDecksLoaded: (state) => state.isDecksLoaded,
    getDecks: (state) => state.decks,

    getDeck: (state) => state.deck,
    getDeckTitle: (state) => (state.deck ? state.deck.title : null),
    getDeckCardsCount: (state) => (state.deck ? state.deck.cards : "-"),
    getDeckCreatedOn: (state) =>
      state.deck ? state.deck.__createdtime__ : null,
    getDeckIsTodaysSessionCompleted: (state) =>
      state.deck ? state.deck.is_todays_session_completed : true,

    getIsDeckCardsLoaded: (state) => state.isDeckCardsLoaded,
    getDeckCards: (state) => state.deckCards,

    getIsDeckSessionsLoaded: (state) => state.isDeckSessionsLoaded,
    getDeckSessions: (state) => state.deckSessions,

    getIsCardSidebarOpen: (state) => state.isCardSidebarOpen,
    getSelectedCardTitle: (state) => state.selectedCard.title,
    getSelectedCardContent: (state) => state.selectedCard.content,

    getIsCardUpdateCase: (state) => state.isCardUpdateCase,
    getIsCardFormSidebarOpen: (state) => state.isCardFormSidebarOpen,
    getFormCardTitle: (state) => state.formCard.title,
    getFormCardContent: (state) => state.formCard.content,

    getSessionId: (state) => state.session.id,
    getSessionTitle: (state) => state.session.title,
    getSessionDate: (state) => state.session.date,
    getSessionDeckId: (state) => state.session.deck_id,

    getIsSessionLoadingNewCard: (state) => state.isSessionLoadingNewCard,

    getSessionCardId: (state) =>
      state.sessionNextCard ? state.sessionNextCard.card.card_id : "",
    getSessionCardTitle: (state) => {
      try {
        return state.sessionNextCard.card.title;
      } catch (error) {
        return "";
      }
    },
    getSessionCardContents: (state) => {
      try {
        return state.sessionNextCard.card.content;
      } catch (error) {
        return "";
      }
    },
    getSessionRemainingCards: (state) =>
      state.sessionNextCard ? state.sessionNextCard.remaining_cards : 0,
    getIsSessionCompleted: (state) =>
      state.sessionNextCard
        ? state.sessionNextCard.is_session_completed
        : false,
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
    DELETE_DECK: (state, deckId) => {
      const decks = [...state.decks];
      const index = decks.findIndex((item) => item.id === deckId);
      if (index !== -1) {
        decks.splice(index, 1);
      }
      Vue.set(state, "decks", decks);
    },
    UPDATE_DECK_TITLE: (state, payload) => {
      const { deckId, title } = payload;
      const decks = [...state.decks];
      const index = decks.findIndex((item) => item.id === deckId);
      if (index !== -1) {
        decks[index].title = title;
        Vue.set(state, "decks", decks);
      }

      if (state.deck) {
        state.deck.title = title;
      }
    },

    SET_DECK: (state, payload) => (state.deck = payload),
    INCREMENT_DECK_CARDS_COUNT: (state) => {
      if (state.deck) {
        state.deck.cards += 1;
      }
    },
    DECREMENT_DECK_CARDS_COUNT: (state) => {
      if (state.deck) {
        state.deck.cards -= 1;
      }
    },

    SET_IS_DECK_CARDS_LOADED: (state, payload) =>
      (state.isDeckCardsLoaded = payload),
    SET_DECK_CARDS: (state, payload) => (state.deckCards = payload),
    ADD_CARD_TO_DECK: (state, payload) => {
      const cards = [...state.deckCards];
      cards.push(payload);
      Vue.set(state, "deckCards", cards);
    },
    DELETE_CARD: (state, deckId) => {
      const cards = [...state.deckCards];
      const index = cards.findIndex((item) => item.id === deckId);
      if (index !== -1) {
        cards.splice(index, 1);
      }
      Vue.set(state, "deckCards", cards);
    },

    SET_IS_DECK_SESSIONS_LOADED: (state, payload) =>
      (state.isDeckSessionsLoaded = payload),
    SET_DECK_SESSIONS: (state, payload) => (state.deckSessions = payload),

    SET_IS_CARD_SIDEBAR_OPEN: (state, payload) =>
      (state.isCardSidebarOpen = payload),
    SET_SELECTED_CARD_TITLE: (state, payload) =>
      (state.selectedCard.title = payload),
    SET_SELECTED_CARD_CONTENT: (state, payload) =>
      (state.selectedCard.content = payload),

    SET_IS_CARD_UPDATE_CASE: (state, payload) =>
      (state.isCardUpdateCase = payload),
    SET_IS_CARD_FORM_SIDEBAR_OPEN: (state, payload) =>
      (state.isCardFormSidebarOpen = payload),
    SET_FORM_CARD_TITLE: (state, payload) => (state.formCard.title = payload),
    SET_FORM_CARD_CONTENT: (state, payload) =>
      (state.formCard.content = payload),

    SET_SESSION_ID: (state, payload) => (state.session.id = payload),
    SET_SESSION_TITLE: (state, payload) => (state.session.title = payload),
    SET_SESSION_DATE: (state, payload) => (state.session.date = payload),
    SET_SESSION_DECK_ID: (state, payload) => (state.session.deck_id = payload),

    SET_IS_SESSION_LOADING_NEW_CARD: (state, payload) =>
      (state.isSessionLoadingNewCard = payload),

    SET_SESSION_NEXT_CARD: (state, payload) =>
      (state.sessionNextCard = payload),
  },

  actions: {
    // eslint-disable-next-line no-empty-pattern
    async authCreateNewAccount({}, payload) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Creating new account ... Please wait ...`,
        type: "is-success",
      });
      try {
        const response = await registerAPI(payload);
        if (response.status === 200) {
          return { success: true };
        }
        return { success: false };
      } catch (error) {
        const errResponse = error.response;
        if (errResponse.status === 409) {
          return {
            success: false,
            status: 409,
            message: errResponse.data.detail,
          };
        }
      } finally {
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
      }
    },

    async authLogin({ commit }, payload) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Logging in ... Please wait ...`,
        type: "is-success",
      });
      try {
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
      } catch (error) {
        const errResponse = error.response;
        if (errResponse.status === 401) {
          return {
            success: false,
            status: errResponse.status,
            message: errResponse.data.detail,
          };
        }
      } finally {
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
      }
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

    async loadDeck({ commit }, deckId) {
      commit("SET_DECK", null);
      const response = await retrieveDeckAPI(deckId);
      if (response.status === 200) {
        commit("SET_DECK", response.data);
      }
    },

    async deleteDeck({ commit }, deckId) {
      let toast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Deleting deck ... Please wait ...`,
        type: "is-success",
      });
      const response = await deleteDeckAPI(deckId);
      if (response.status === 200) {
        commit("DELETE_DECK", deckId);
        if (toast) {
          toast.close();
          toast = null;
        }
      }
    },

    async deleteCard({ commit }, cardId) {
      let toast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Deleting card ... Please wait ...`,
        type: "is-success",
      });
      const response = await deleteCardAPI(cardId);
      if (response.status === 200) {
        commit("DELETE_CARD", cardId);
        commit("DECREMENT_DECK_CARDS_COUNT");
        if (toast) {
          toast.close();
          toast = null;
        }
      }
    },

    async loadDeckSessions({ commit }, deckId) {
      commit("SET_IS_DECK_SESSIONS_LOADED", false);
      commit("SET_DECK_SESSIONS", []);
      const response = await getDeckSessionsAPI(deckId);
      if (response.status === 200) {
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          item["sr_no"] = i + 1;
          item["status"] = item.is_completed ? "COMPLETED" : "PENDING";

          let percent = 0;
          if (item.total_cards !== 0) {
            percent = Math.floor(
              (item.correct_cards_count / item.total_cards) * 100
            );
          }

          item["success_rate"] = `${percent}%`;
        }

        commit("SET_IS_DECK_SESSIONS_LOADED", true);
        commit("SET_DECK_SESSIONS", data);
      }
    },

    async createDeck({ getters, commit }, payload) {
      const { title } = payload;

      const decks = getters["getDecks"];
      const i = decks.findIndex((item) => item.title === title);
      if (i !== -1) {
        this._vm.$buefy.toast.open({
          message: `This deck already exists`,
          type: "is-danger",
        });
      } else {
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
      }
    },

    async updateDeck({ commit }, payload) {
      const { title, deckId } = payload;
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Updating deck ... Please wait ...`,
        type: "is-success",
      });
      const response = await updateDeckAPI(deckId, { title });
      if (response.status === 200) {
        commit("UPDATE_DECK_TITLE", { deckId, title });
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
        commit("INCREMENT_DECK_CARDS_COUNT");
        commit("SET_FORM_CARD_TITLE", "");
        commit("SET_FORM_CARD_CONTENT", "");
      }
    },

    async retrieveSession({ commit }, sessionId) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Fetching session information ... Please wait ...`,
        type: "is-success",
      });
      const response = await retrieveSessionAPI(sessionId);
      if (response.status === 200) {
        const data = response.data;
        commit("SET_SESSION_ID", data.id);
        commit("SET_SESSION_TITLE", data.title);
        commit("SET_SESSION_DATE", data.session_date);
        commit("SET_SESSION_DECK_ID", data.deck_id);
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
        return { success: true };
      }
    },

    async startSession({ commit }, deckId) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Starting session ... Please wait ...`,
        type: "is-success",
      });
      const response = await startRevisionAPI(deckId);
      if (response.status === 200) {
        const data = response.data;
        commit("SET_SESSION_ID", data.id);
        commit("SET_SESSION_TITLE", data.title);
        commit("SET_SESSION_DATE", data.session_date);
        commit("SET_SESSION_DECK_ID", data.deck_id);
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
        return { success: true };
      }
    },

    async getNextCard({ commit }, sessionId) {
      commit("SET_IS_SESSION_LOADING_NEW_CARD", true);
      const response = await getNextCardAPI(sessionId);
      if (response.status === 200) {
        commit("SET_SESSION_NEXT_CARD", response.data);
        commit("SET_IS_SESSION_LOADING_NEW_CARD", false);
        return { success: true };
      }
    },

    async moveCard({ getters }, isCorrect) {
      const sessionId = getters["getSessionId"];
      const cardId = getters["getSessionCardId"];
      const response = await moveCardAPI(sessionId, {
        card_id: cardId,
        is_correct: isCorrect,
      });
      if (response.status === 200) {
        return { success: true };
      }
    },

    // eslint-disable-next-line no-empty-pattern
    async markSessionAsComplete({}, sessionId) {
      let creationToast = this._vm.$buefy.toast.open({
        indefinite: true,
        message: `Closing session ... Please wait ...`,
        type: "is-success",
      });
      const response = await markSessionAsCompleteAPI(sessionId);
      if (response.status === 200) {
        if (creationToast) {
          creationToast.close();
          creationToast = null;
        }
        return { success: true };
      }
    },

    openEditCardForm({ commit, getters }, cardId) {
      const cards = getters["getDeckCards"];
      const index = cards.findIndex((item) => item.id === cardId);
      if (index !== -1) {
        const { title, content } = cards[index];
        commit("SET_IS_CARD_UPDATE_CASE", true);
        commit("SET_FORM_CARD_TITLE", title);
        commit("SET_FORM_CARD_CONTENT", content);
        commit("SET_IS_CARD_FORM_SIDEBAR_OPEN", true);
      }
    },
  },
});
