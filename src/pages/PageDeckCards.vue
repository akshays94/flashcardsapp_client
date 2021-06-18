<template>
  <section class="pt-6">
    <BaseButton
      title="Add new card to this deck"
      button-color="green"
      @on-clicked="openAddNewCardForm()"
    />

    <div class="mt-4" v-if="!isDeckCardsLoaded">
      Loading cards in this deck ...
    </div>

    <div class="mt-4" v-else>
      <transition-group
        v-if="deckCards.length > 0"
        class="grid grid-cols-3 gap-6"
        enter-active-class="animate__animated animate__tada"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <div v-for="card in deckCards" :key="card.id">
          <CardDeckCard :title="card.title" :content="card.content" />
        </div>
      </transition-group>

      <div v-else-if="deckCards.length === 0">
        No cards added to this deck
      </div>
    </div>
  </section>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton.vue";
import CardDeckCard from "@/components/CardDeckCard.vue";

export default {
  components: {
    BaseButton,
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
    ...Vuex.mapActions(["loadDeckCards", "openCardFormForAdd"]),

    openAddNewCardForm() {
      this.openCardFormForAdd();
    },
  },
};
</script>
