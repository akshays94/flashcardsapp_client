<template>
  <div class="p-6">
    <div class="text-3xl font-bold mb-4">Add new card</div>

    <section class="mt-6">
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>

      <b-field label="Content">
        <b-input
          v-model="content"
          maxlength="2000"
          type="textarea"
          is-large
        ></b-input>
      </b-field>
    </section>

    <section>
      <BaseButton title="Save" @on-clicked="saveForm()" />

      <BaseButton
        title="Close"
        class="ml-4"
        @on-clicked="closeCardFormForAdd()"
      />
    </section>
  </div>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  props: {
    deckId: {
      type: String,
      required: true,
    },
  },

  computed: {
    title: {
      get() {
        return this.$store.getters["getFormCardTitle"];
      },
      set(value) {
        this.$store.commit("SET_FORM_CARD_TITLE", value);
      },
    },

    content: {
      get() {
        return this.$store.getters["getFormCardContent"];
      },
      set(value) {
        this.$store.commit("SET_FORM_CARD_CONTENT", value);
      },
    },
  },

  methods: {
    ...Vuex.mapActions(["closeCardFormForAdd", "createCardInDeck"]),

    saveForm() {
      this.createCardInDeck(this.deckId);
    },
  },
};
</script>
