<template>
  <section>
    <section v-if="sessionId !== null">
      <button
        tag="button"
        class="mb-4 text-gray-400 underline outline-none select-none"
        @click="onDoneForTheDayClick()"
      >
        Go Back
      </button>

      <BasePageTitle :title="sessionTitle" />

      <div class="mt-2 text-gray-600">Session date: {{ sessionDate }}</div>
      <hr />

      <section class="mt-6 h-96 flex justify-center">
        <FlippingCard
          :card-title="cardTitle"
          :card-contents="cardContents"
          :is-reveal-card="isRevealCard"
          :is-show-card-contents="isShowCardContents"
          :is-answered="isAnswered"
          :is-correct-answer="isCorrectAnswer"
          :is-loading-new-card="isLoadingNewCard"
          :is-session-completed="isSessionCompleted"
          @on-clicked="!isRevealCard ? onRevealCardClick() : null"
        />
      </section>

      <section
        v-if="!isLoadingNewCard && !isSessionCompleted"
        class="flex justify-center mt-4"
      >
        <div v-if="!isRevealCard">
          <div class="flex">
            <div class="text-2xl">Try to recall then flip</div>
            <img class="w-8 ml-2" src="../assets/click.gif" alt="" />
          </div>
          <div class="text-center mt-4 text-gray-500 font-bold">
            Cards remaining: {{ remainingCardsCount }}
          </div>
        </div>

        <section v-else>
          <div class="text-2xl text-center">Did you remember this?</div>

          <div class="flex justify-center mt-4">
            <BaseButton
              title="No"
              button-color="red"
              @on-clicked="onNoClick()"
            />

            <BaseButton
              title="Yes, I remembered"
              button-color="green"
              class="ml-4"
              @on-clicked="onYesClick()"
            />

            <BaseButton
              title="I'm done for the day"
              button-color="purple"
              class="ml-4"
              @on-clicked="onDoneForTheDayClick()"
            />
          </div>
        </section>
      </section>

      <section
        v-if="!isLoadingNewCard && isSessionCompleted"
        class="flex justify-center mt-4"
      >
        <BaseButton
          title="Go back!"
          button-color="purple"
          class="ml-4"
          @on-clicked="
            $router.replace({
              name: 'PageDeckRevisions',
              params: { deckId: sessionDeckId },
              query: { t: sessionTitle },
            })
          "
        />
      </section>
    </section>
  </section>
</template>

<script>
import Vuex from "vuex";
import BasePageTitle from "@/components/BasePageTitle.vue";
import BaseButton from "@/components/BaseButton.vue";
import FlippingCard from "@/components/FlippingCard.vue";

export default {
  components: {
    BasePageTitle,
    BaseButton,
    FlippingCard,
  },

  data() {
    return {
      isRevealCard: false,
      isShowCardContents: false,
      isAnswered: false,
      isCorrectAnswer: false,
    };
  },

  computed: {
    ...Vuex.mapGetters({
      sessionId: "getSessionId",
      sessionTitle: "getSessionTitle",
      sessionDate: "getSessionDate",
      sessionDeckId: "getSessionDeckId",

      cardTitle: "getSessionCardTitle",
      cardContents: "getSessionCardContents",
      remainingCardsCount: "getSessionRemainingCards",
      isSessionCompleted: "getIsSessionCompleted",
    }),
    isLoadingNewCard: {
      get() {
        return this.$store.getters["getIsSessionLoadingNewCard"];
      },
      set(val) {
        this.$store.commit("SET_IS_SESSION_LOADING_NEW_CARD", val);
      },
    },
  },

  async created() {
    window.scrollTo(0, 0); // scroll to top on page load
    const pageSessionId = this.$route.params.sessionId;
    if (!this.sessionId) {
      await this.retrieveSession(pageSessionId);
    }
    this.getNextCard(pageSessionId);
  },

  methods: {
    ...Vuex.mapActions([
      "retrieveSession",
      "getNextCard",
      "moveCard",
      "markSessionAsComplete",
    ]),

    onRevealCardClick() {
      this.isRevealCard = true;
      setTimeout(() => {
        this.isShowCardContents = true;
      }, 1000);
    },

    resetValues() {
      this.isRevealCard = false;
      this.isShowCardContents = false;
      this.isLoadingNewCard = true;
      this.isAnswered = false;
      this.isCorrectAnswer = false;
    },

    onYesClick() {
      this.isAnswered = true;
      this.isCorrectAnswer = true;
      setTimeout(async () => {
        this.resetValues();
        await this.moveCard(true);
        await this.getNextCard(this.sessionId);
      }, 1500);
    },

    onNoClick() {
      this.isAnswered = true;
      this.isCorrectAnswer = false;
      setTimeout(async () => {
        this.resetValues();
        await this.moveCard(false);
        await this.getNextCard(this.sessionId);
      }, 1500);
    },

    onDoneForTheDayClick() {
      this.$buefy.dialog.confirm({
        message:
          "Are you done for the day? If yes then you will be able to continue this session tomorrow",
        cancelText: "No",
        confirmText: "Yes",
        onConfirm: async () => {
          await this.markSessionAsComplete(this.sessionId);
          this.$router.replace({
            name: "PageDeckRevisions",
            params: { deckId: this.sessionDeckId },
            query: { t: this.sessionTitle },
          });
        },
      });
    },
  },
};
</script>
