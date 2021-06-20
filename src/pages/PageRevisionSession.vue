<template>
  <section>
    <section v-if="sessionId !== null">
      <!-- <router-link
        tag="button"
        :to="{ name: 'PageHome' }"
        class="mb-4 text-gray-400 underline outline-none select-none"
      >
        Go Back
      </router-link> -->

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
          @on-clicked="!isRevealCard ? onRevealCardClick() : null"
        />
      </section>

      <section v-if="!isLoadingNewCard" class="flex justify-center mt-4">
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
              title="Yes, I remember"
              button-color="green"
              class="ml-4"
              @on-clicked="onYesClick()"
            />

            <BaseButton
              title="I'm done for the day"
              button-color="purple"
              class="ml-4"
              @on-clicked="onYesClick()"
            />
          </div>
        </section>
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

      cardTitle: "getSessionCardTitle",
      cardContents: "getSessionCardContents",
      remainingCardsCount: "getSessionRemainingCards",
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
    ...Vuex.mapActions(["retrieveSession", "getNextCard", "moveCard"]),

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
  },
};
</script>
