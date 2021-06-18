<template>
  <header class="bg-purple-900 border-b-4 border-gray-400 p-2">
    <div class="flex justify-between items-center max-w-5xl mx-auto">
      <div class="logo text-white font-bold text-2xl">FLASHLEARN</div>

      <div class="flex items-baseline">
        <div class="text-white select-none">Logged in as {{ name }}</div>

        <button
          class="ml-4 text-white underline hover:no-underline hover:text-gray-200"
          title="Click here to logout"
          @click="logout()"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters({
      name: "getName",
    }),
  },

  methods: {
    ...Vuex.mapActions(["authLogout"]),

    logout() {
      this.$buefy.dialog.confirm({
        message: "Logout?",
        onConfirm: () => {
          this.authLogout();
          this.$router.replace({ name: "PageLogin" });
        },
      });
    },
  },
};
</script>
