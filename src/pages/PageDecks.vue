<template>
  <div>
    <section
      class="flex flex-col items-start md:flex-row md:justify-between md:items-end mb-16"
    >
      <BasePageTitle title="Decks" />

      <BaseButton
        class="mt-4 md:mt-0"
        title="Create new deck"
        button-color="green"
        @on-clicked="addNewDeck()"
      />
    </section>

    <section v-if="isDecksLoaded">
      <transition-group
        v-if="decks.length > 0"
        enter-active-class="animate__animated animate__tada"
        leave-active-class="animate__animated animate__zoomOut"
        class="grid md:grid-cols-3 gap-12"
      >
        <div v-for="deck in decks" :key="deck.id">
          <router-link
            :to="{
              name: 'PageDeckCards',
              params: { deckId: deck.id },
              query: { t: deck.title },
            }"
          >
            <CardDeck
              :title="deck.title"
              @delete-card="deleteCard(deck.id, deck.title)"
            />
          </router-link>
        </div>
      </transition-group>

      <div v-else>
        <BaseEmpty
          class="animate__animated animate__fadeIn"
          message="No decks added"
        >
          <img class="w-1/2" src="../assets/undraw_empty.svg" />
        </BaseEmpty>
      </div>
    </section>

    <div v-else>
      <BaseLoading message="Loading decks ..." />
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import CardDeck from "@/components/CardDeck.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageTitle from "@/components/BasePageTitle.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseEmpty from "@/components/BaseEmpty.vue";

export default {
  title: "Decks",

  components: {
    CardDeck,
    BaseButton,
    BasePageTitle,
    BaseLoading,
    BaseEmpty,
  },
  computed: {
    ...Vuex.mapGetters({
      isDecksLoaded: "getIsDecksLoaded",
      decks: "getDecks",
    }),
  },
  created() {
    if (this.decks.length === 0) {
      this.loadDecks();
    }
    this.resetDeckCards();
  },
  methods: {
    ...Vuex.mapActions([
      "loadDecks",
      "createDeck",
      "resetDeckCards",
      "deleteDeck",
    ]),

    addNewDeck() {
      this.$buefy.dialog.prompt({
        title: "Create New Deck",
        message: `Title of the deck`,
        inputAttrs: {
          placeholder: "e.g. Web development",
          maxlength: 20,
        },
        trapFocus: true,
        onConfirm: async (title) => {
          await this.createDeck({ title });
        },
      });
    },

    deleteCard(deckId, deckTitle) {
      this.$buefy.dialog.confirm({
        message: `Delete ${deckTitle}?`,
        confirmText: "Delete Deck",
        type: "is-danger",
        onConfirm: async () => {
          await this.deleteDeck(deckId);
        },
      });
    },
  },
};
</script>
