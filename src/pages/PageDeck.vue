<template>
  <div>
    <b-sidebar
      type="is-light"
      fullheight
      overlay
      right
      v-model="isCardSidebarOpen"
      :can-cancel="false"
    >
      <CardContent />
    </b-sidebar>

    <b-sidebar
      type="is-light"
      fullheight
      overlay
      right
      v-model="isCardFormSidebarOpen"
      :can-cancel="false"
    >
      <FormCard :deckId="deckId" />
    </b-sidebar>

    <router-link
      tag="button"
      :to="{ name: 'PageHome' }"
      class="mb-4 text-gray-400 underline outline-none select-none"
    >
      Go Back
    </router-link>

    <div class="flex items-center">
      <BasePageTitle :title="deckTitle" />
      <a class="ml-3 underline" @click="editTitle()">Edit title</a>
    </div>

    <div
      class="mt-4 mb-6 text-gray-500"
      :class="{ invisible: parsedDeckCreatedOn === '-' }"
    >
      <div>
        Created on: {{ parsedDeckCreatedOn }} | Cards in this deck:
        {{ deckCardsCount }}
      </div>
    </div>

    <div class="bg-purple-700 border-b-4 border-black p-2 flex rounded-lg ">
      <div
        class="font-bold text-lg text-white py-1 px-4 rounded-full cursor-pointer transition-all duration-300"
        :class="{ 'bg-purple-500 underline': tabCardsActive }"
        @click="tabChange('cards')"
      >
        Cards
      </div>
      <div
        class="font-bold text-lg text-white py-1 px-4 rounded-full cursor-pointer ml-4 transition-all duration-300"
        :class="{ 'bg-purple-500 underline': tabRevisionsActive }"
        @click="tabChange('revisions')"
      >
        Revisions
      </div>
    </div>

    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vuex from "vuex";
import BasePageTitle from "@/components/BasePageTitle.vue";
import CardContent from "@/components/CardContent.vue";
import FormCard from "@/components/FormCard.vue";

export default {
  components: {
    BasePageTitle,
    CardContent,
    FormCard,
  },

  computed: {
    ...Vuex.mapGetters({
      isCardSidebarOpen: "getIsCardSidebarOpen",
      isCardFormSidebarOpen: "getIsCardFormSidebarOpen",
      deckCardsCount: "getDeckCardsCount",
      deckCreatedOn: "getDeckCreatedOn",
      storeTitle: "getDeckTitle",
    }),

    parsedDeckCreatedOn() {
      return this.deckCreatedOn
        ? new Date(this.deckCreatedOn).toLocaleDateString()
        : "-";
    },
  },

  data() {
    return {
      deckId: null,
      deckTitle: "",
      tabCardsActive: false,
      tabRevisionsActive: false,
      sidebarOpen: false,
    };
  },

  created() {
    window.scrollTo(0, 0); // scroll to top on page load
    if (this.$route.name === "PageDeckCards") {
      this.tabCardsActive = true;
    } else if (this.$route.name === "PageDeckRevisions") {
      this.tabRevisionsActive = true;
    }
    this.deckTitle = this.$route.query.t;
    this.deckId = this.$route.params.deckId;
    document.title = `${this.deckTitle} - Flashlearn`;

    console.log(this.deckId);
    this.loadDeck(this.deckId);
  },

  methods: {
    ...Vuex.mapActions(["loadDeck", "updateDeck"]),

    tabChange(tabName) {
      let routeName = "";
      if (tabName === "cards") {
        routeName = "PageDeckCards";
        this.tabCardsActive = true;
        this.tabRevisionsActive = false;
      } else {
        routeName = "PageDeckRevisions";
        this.tabCardsActive = false;
        this.tabRevisionsActive = true;
      }
      const deckId = this.deckId;
      const deckTitle = this.deckTitle;
      this.$router.replace({
        name: routeName,
        params: { deckId },
        query: { t: deckTitle },
      });
    },

    editTitle() {
      this.$buefy.dialog.prompt({
        title: "Edit title",
        message: `Title of the deck`,
        inputAttrs: {
          maxlength: 20,
          value: this.deckTitle,
        },
        trapFocus: true,
        onConfirm: async (title) => {
          await this.updateDeck({ deckId: this.deckId, title });
        },
      });
    },
  },

  watch: {
    storeTitle(val) {
      if (val) {
        this.deckTitle = val;
      }
    },
  },
};
</script>
