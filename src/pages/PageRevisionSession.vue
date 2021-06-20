<template>
  <section>
    <!-- <router-link
      tag="button"
      :to="{ name: 'PageHome' }"
      class="mb-4 text-gray-400 underline outline-none select-none"
    >
      Go Back
    </router-link> -->

    <BasePageTitle title="Algorithms" />
    <div class="mt-2 text-gray-600">Session date: 12 Jun 2020</div>
    <hr>

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
      <div v-if="!isRevealCard" class="flex">
        <div class="text-2xl">Try to recall then flip</div>
        <img class="w-8 ml-2" src="../assets/click.gif" alt="" />
      </div>

      <section v-else>
        <div class="text-2xl text-center">Did you remember this?</div>

        <div class="flex justify-center mt-4">
          <BaseButton title="No" button-color="red" @on-clicked="onNoClick()" />

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
</template>

<script>
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
      isLoadingNewCard: false,
      cardTitle: "Lock Pattern",
      cardContents: "Locking locking locking",
      isRevealCard: false,
      isShowCardContents: false,
      isAnswered: false,
      isCorrectAnswer: false,
    };
  },

  methods: {
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
    },

    onYesClick() {
      this.isAnswered = true;
      this.isCorrectAnswer = true;
      setTimeout(() => {
        this.resetValues();
      }, 1500);
    },

    onNoClick() {
      this.isAnswered = true;
      this.isCorrectAnswer = false;
      setTimeout(() => {
        this.resetValues();
      }, 1500);
    },
  },
};
</script>
