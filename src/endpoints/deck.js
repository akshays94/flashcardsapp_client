import { withAuthAxios } from "@/axios";

export const getDecksAPI = () => withAuthAxios.get("/decks/");

export const getDeckCardsAPI = (deckId) =>
  withAuthAxios.get(`/decks/${deckId}/cards/`);

export const createDeckAPI = (data) =>
  withAuthAxios.post(`/decks/`, data);
