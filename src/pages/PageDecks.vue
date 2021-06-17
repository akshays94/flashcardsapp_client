<template>
  <div>
    <div class="flex justify-between items-end mb-12">
      <div class="text-5xl font-bold animate__animated animate__bounce">
        Decks
      </div>
      <BaseButton title="Create new deck" @on-clicked="addNewDeck()" />
    </div>

    <div v-if="isDecksLoaded" class="grid grid-cols-3 gap-12">
      <div v-for="deck in decks" :key="deck.id">
        <router-link
          :to="{
            name: 'PageDeck',
            params: { deckId: deck.id },
            query: { t: deck.title },
          }"
        >
          <CardDeck :title="deck.title" />
        </router-link>
      </div>
    </div>

    <div v-else>Loading decks ...</div>
  </div>
</template>

<script>
import Vuex from "vuex";
import CardDeck from "@/components/CardDeck.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    CardDeck,
    BaseButton,
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
  },
  methods: {
    ...Vuex.mapActions(["loadDecks", "createDeck"]),

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
          // this.$buefy.toast.open(`Your name is: ${value}`)
          await this.createDeck({ title });
        },
      });
    },
  },
};
</script>
