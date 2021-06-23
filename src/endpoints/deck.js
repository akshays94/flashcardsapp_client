import { withAuthAxios } from "@/axios";

export const getDecksAPI = () => withAuthAxios.get("/decks/");

export const retrieveDeckAPI = (deckId) =>
  withAuthAxios.get(`/decks/${deckId}/`);

export const getDeckCardsAPI = (deckId) =>
  withAuthAxios.get(`/decks/${deckId}/cards/`);

export const deleteDeckAPI = (deckId) =>
  withAuthAxios.delete(`/decks/${deckId}/`);

export const getDeckSessionsAPI = (deckId) =>
  withAuthAxios.get(`/decks/${deckId}/sessions/`);

export const createDeckAPI = (data) => withAuthAxios.post(`/decks/`, data);

export const createCardInDeckAPI = (deckId, data) =>
  withAuthAxios.post(`/decks/${deckId}/cards/`, data);

export const retrieveSessionAPI = (sessionId) =>
  withAuthAxios.get(`/sessions/${sessionId}/`);

export const startRevisionAPI = (deckId) =>
  withAuthAxios.post(`/decks/${deckId}/start-revision/`);

export const getNextCardAPI = (sessionId) =>
  withAuthAxios.get(`/sessions/${sessionId}/next-card/`);

export const moveCardAPI = (sessionId, data) =>
  withAuthAxios.post(`/sessions/${sessionId}/move-card/`, data);

export const markSessionAsCompleteAPI = (sessionId) =>
  withAuthAxios.post(`/sessions/${sessionId}/mark-complete/`);
