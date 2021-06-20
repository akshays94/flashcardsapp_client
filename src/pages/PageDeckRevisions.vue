<template>
  <section class="pt-6">
    <BaseButton
      title="Start today's revision session"
      button-color="yellow"
      @on-clicked="startRevision()"
    />

    <section class="pt-4">
      Sessions table comes here
    </section>
  </section>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      deckId: null,
    };
  },

  created() {
    this.deckId = this.$route.params.deckId;
  },

  computed: {
    ...Vuex.mapGetters({
      sessionId: "getSessionId",
    }),
  },

  methods: {
    ...Vuex.mapActions(["startSession"]),

    async startRevision() {
      const result = await this.startSession(this.deckId);
      if (result.success) {
        this.$router.replace({
          name: "PageRevisionSession",
          params: { sessionId: this.sessionId },
        });
      }
    },
  },
};
</script>
