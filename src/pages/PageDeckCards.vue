<template>
  <section class="p-4">
    <div class="mt-4" v-if="!isDeckCardsLoaded">
      Loading cards in this deck ...
    </div>

    <div class="mt-4" v-else>
      <div v-if="deckCards.length > 0" class="grid grid-cols-3 gap-6">
        <div v-for="card in deckCards" :key="card.id">
          <CardDeckCard :title="card.title" :content="card.content" />
        </div>
      </div>

      <div v-else-if="deckCards.length === 0">
        No cards added to this deck
      </div>
    </div>
  </section>
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
      deckId: null,
    };
  },
  computed: {
    ...Vuex.mapGetters({
      isDeckCardsLoaded: "getIsDeckCardsLoaded",
      deckCards: "getDeckCards",
    }),
  },
  created() {
    this.deckId = this.$route.params.deckId;
    if (!this.isDeckCardsLoaded) {
      this.loadDeckCards(this.deckId);
    }
  },
  methods: {
    ...Vuex.mapActions(["loadDeckCards"]),
  },
};
</script>
