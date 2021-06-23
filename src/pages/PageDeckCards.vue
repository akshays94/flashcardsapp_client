<template>
  <section class="pt-6">
    <BaseButton
      title="Add new card to this deck"
      button-color="green"
      @on-clicked="openAddNewCardForm()"
    />

    <div class="mt-6" v-if="!isDeckCardsLoaded">
      <BaseLoading message="Loading cards ..." />
    </div>

    <div class="mt-6" v-else>
      <transition-group
        v-if="deckCards.length > 0"
        class="grid md:grid-cols-3 gap-6"
        enter-active-class="animate__animated animate__tada"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-for="card in deckCards" :key="card.id">
          <CardDeckCard
            :title="card.title"
            :content="card.content"
            @edit-card="openEditCardForm(card.id)"
            @delete-card="deleteCardFromDeck(card.id, card.title)"
          />
        </div>
      </transition-group>

      <div v-else-if="deckCards.length === 0">
        <BaseEmpty
          class="animate__animated animate__fadeIn"
          message="No cards added to this deck"
        >
          <img class="w-1/2" src="../assets/undraw_empty_street.svg" />
        </BaseEmpty>
      </div>
    </div>
  </section>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseEmpty from "@/components/BaseEmpty.vue";
import CardDeckCard from "@/components/CardDeckCard.vue";

export default {
  components: {
    BaseButton,
    BaseLoading,
    BaseEmpty,
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
    ...Vuex.mapActions([
      "loadDeckCards",
      "openCardFormForAdd",
      "deleteCard",
      "openEditCardForm",
    ]),

    openAddNewCardForm() {
      this.openCardFormForAdd();
    },

    deleteCardFromDeck(cardId, cardTitle) {
      if (cardTitle) {
        this.$buefy.dialog.confirm({
          message: `Delete ${cardTitle}?`,
          confirmText: "Delete Card",
          type: "is-danger",
          onConfirm: async () => {
            await this.deleteCard(cardId);
          },
        });
      }
    },

    openEditCardForm(cardId) {
      console.log("editing cardId", cardId);
      this.openEditCardForm(cardId);
    },
  },
};
</script>
