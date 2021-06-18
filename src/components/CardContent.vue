<template>
  <div class="p-6">
    <button class="underline text-red-400 mb-4" @click="closeSelectedCard()">
      Close this card
    </button>
    <div class="text-3xl font-bold mb-4">{{ title }}</div>

    <div class="markdown" v-html="parsedContent"></div>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters({
      title: "getSelectedCardTitle",
      parsedContent: "getSelectedCardContent",
    }),
  },

  methods: {
    ...Vuex.mapActions(["closeSelectedCard"]),
  },
};
</script>
