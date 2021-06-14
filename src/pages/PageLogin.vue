<template>
  <div>
    <BaseButton title="Login as guest" @on-clicked="loginAsGuest()" />
  </div>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    BaseButton,
  },
  methods: {
    ...Vuex.mapActions(["authLogin"]),

    async loginAsGuest() {
      console.log("login as guest ...");
      const formData = new FormData();
      formData.append("username", "guest");
      formData.append("password", "guest@123");
      const result = await this.authLogin(formData);
      if (result.success) {
        this.$router.replace({ name: "PageHome" });
      }
    },
  },
};
</script>
