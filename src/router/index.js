import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import PageLogin from "@/pages/PageLogin.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageHome from "@/pages/PageHome.vue";
import PageDecks from "@/pages/PageDecks.vue";
import PageDeck from "@/pages/PageDeck.vue";
import PageDeckCards from "@/pages/PageDeckCards.vue";
import PageDeckRevisions from "@/pages/PageDeckRevisions.vue";
import PageRevisionSession from "@/pages/PageRevisionSession.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: PageHome,
    children: [
      { path: "/", name: "PageHome", component: PageDecks },
      {
        path: "/decks",
        component: PageDeck,
        children: [
          {
            path: "/decks/:deckId/cards",
            name: "PageDeckCards",
            component: PageDeckCards,
          },
          {
            path: "/decks/:deckId/revisions",
            name: "PageDeckRevisions",
            component: PageDeckRevisions,
          },
        ],
      },
      {
        path: "/sessions/:sessionId",
        name: "PageRevisionSession",
        component: PageRevisionSession,
      },
    ],
  },
  { path: "/login", name: "PageLogin", component: PageLogin },
  { path: "*", name: "PageNotFound", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const ignoreRoutes = ["PageLogin"];
  const isProtectedRoute = !ignoreRoutes.includes(to.name);

  const localStorageToken = localStorage.getItem("token");
  const isNoTokenInStorage = !localStorageToken;

  if (isProtectedRoute) {
    if (store.getters.hasToken) {
      next();
    } else {
      if (isNoTokenInStorage) {
        next({ name: "PageLogin" });
      } else {
        const result = await store.dispatch("authSetUserFromToken");
        if (result.success) {
          next();
        } else {
          next({ name: "PageLogin" });
        }
      }
    }
  } else {
    if (isNoTokenInStorage) {
      next();
    } else {
      next({ name: "PageHome" });
    }
    next();
  }
});

export default router;
