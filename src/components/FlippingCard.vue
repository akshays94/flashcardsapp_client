<template>
  <section>
    <div
      v-if="!isLoadingNewCard && !isSessionCompleted"
      class="flip-card"
      :class="{
        'cursor-pointer': !isRevealCard,
        'correct-answer': isAnswered && isCorrectAnswer,
        'wrong-answer': isAnswered && !isCorrectAnswer,
      }"
      @click="$emit('on-clicked')"
    >
      <div class="flip-card-inner" :class="{ 'rotate-card': isRevealCard }">
        <div
          class="flip-card-front front-card-design hover:underline font-bold"
        >
          {{ cardTitle }}
        </div>
        <div class="flip-card-back back-card-design text-left p-4">
          <transition
            enter-active-class="animate__animated animate__fadeIn animate__faster"
          >
            <div v-show="isShowCardContents">
              {{ cardContents }}
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div
      v-if="!isLoadingNewCard && isSessionCompleted"
      class="flip-card front-card-design"
    >
      Session completed!
    </div>

    <transition
      enter-active-class="animate__animated animate__flipInX animate__slow"
    >
      <div v-show="isLoadingNewCard" class="flip-card front-card-design">
        <span class="animate__animated animate__pulse animate__infinite">
          Loading card ... Please wait ...
        </span>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    isSessionCompleted: {
      type: Boolean,
      required: true,
    },
    isLoadingNewCard: {
      type: Boolean,
      required: true,
    },
    cardTitle: {
      type: String || null,
      required: true,
    },
    cardContents: {
      type: String || null,
      required: true,
    },
    isRevealCard: {
      type: Boolean,
      required: true,
    },
    isShowCardContents: {
      type: Boolean,
      required: true,
    },
    isAnswered: {
      type: Boolean,
      required: true,
    },
    isCorrectAnswer: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.front-card-design {
  @apply border-2;
  @apply border-black;
  @apply rounded-xl;
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply text-xl;
  @apply text-black;
  @apply shadow-md;
  background-color: #f0f0f1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%236f6f6f' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

.back-card-design {
  @apply border-2;
  @apply border-black;
  @apply rounded-xl;
  overflow-y: auto;
}

.flip-card {
  background-color: transparent;
  width: 382px;
  height: 382px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.rotate-card {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.wrong-answer {
  animation-duration: 0.5s;
  animation-name: fadeInLeft;
  animation-fill-mode: forwards;
}

@keyframes fadeInLeft {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-150px);
    background-color: pink;
  }
}

.correct-answer {
  animation-duration: 0.5s;
  animation-name: fadeInRight;
  animation-fill-mode: forwards;
}

@keyframes fadeInRight {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(150px);
    background-color: lightgreen;
  }
}
</style>
