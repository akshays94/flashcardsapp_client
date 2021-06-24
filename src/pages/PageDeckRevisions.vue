<template>
  <section class="pt-6">
    <BaseButton
      :disabled="deckIsTodaysSessionCompleted"
      :title="
        deckIsTodaysSessionCompleted
          ? `Today's session completed`
          : `Start today's revision session`
      "
      button-color="yellow"
      @on-clicked="startRevision()"
    />

    <b-modal v-model="isImageModalActive">
      <p class="image">
        <img src="../assets/flashcardsapphowitworks.png" />
      </p>
    </b-modal>

    <a class="ml-4 underline" @click="isImageModalActive = true">
      How revision works?
    </a>

    <section class="pt-6">
      <div class="text-2xl font-bold mb-4">
        Previous Sessions
      </div>

      <b-table
        :data="deckSessions"
        :columns="columns"
        :loading="!isDeckSessionsLoaded"
        striped
        bordered
      >
        <template #empty>
          <div v-if="isDeckSessionsLoaded" class="has-text-centered">
            No sessions found for this deck
          </div>
        </template>
      </b-table>
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
      isImageModalActive: false,
      deckId: null,
      columns: [
        {
          field: "sr_no",
          label: "Sr. No.",
        },
        {
          field: "session_date",
          label: "Date",
        },
        {
          field: "total_cards",
          label: "Total cards",
          numeric: true,
        },
        {
          field: "correct_cards_count",
          label: "Correct cards",
          numeric: true,
        },
        {
          field: "incorrect_cards_count",
          label: "Incorrect cards",
          numeric: true,
        },
        {
          field: "success_rate",
          label: "Success",
          numeric: true,
        },
        {
          field: "status",
          label: "Status",
        },
      ],
    };
  },

  async created() {
    this.deckId = this.$route.params.deckId;
    await this.loadDeckSessions(this.deckId);
  },

  computed: {
    ...Vuex.mapGetters({
      sessionId: "getSessionId",
      isDeckSessionsLoaded: "getIsDeckSessionsLoaded",
      deckSessions: "getDeckSessions",
      deckIsTodaysSessionCompleted: "getDeckIsTodaysSessionCompleted",
    }),
  },

  methods: {
    ...Vuex.mapActions(["startSession", "loadDeckSessions"]),

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
