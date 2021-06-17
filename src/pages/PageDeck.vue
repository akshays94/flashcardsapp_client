<template>
  <div>
    <router-link tag="button" :to="{ name: 'PageHome' }" class="mb-4">
      Go Back
    </router-link>

    <div class="text-5xl mb-8">{{ deckTitle }}</div>

    <div
      v-if="isDeckCardsLoaded && deckCards.length > 0"
      class="grid grid-cols-3 gap-6"
    >
      <div v-for="card in deckCards" :key="card.id">
        <CardDeckCard :title="card.title" />
      </div>
    </div>

    <div v-else-if="isDeckCardsLoaded && deckCards.length === 0">
      No cards added to this deck
    </div>

    <div v-else>Loading cards ...</div>
  </div>
</template>

<script>
import Vuex from "vuex";
import CardDeckCard from "@/components/CardDeckCard.vue";

export default {
  components: {
    CardDeckCard,
  },
  data() {
    return {
      deckTitle: "",
    };
  },
  computed: {
    ...Vuex.mapGetters({
      isDeckCardsLoaded: "getIsDeckCardsLoaded",
      deckCards: "getDeckCards",
    }),
  },
  created() {
    this.deckTitle = this.$route.query.t;
    const deckId = this.$route.params.deckId;
    this.loadDeckCards(deckId);
  },
  methods: {
    ...Vuex.mapActions(["loadDeckCards"]),
  },
};
</script>
