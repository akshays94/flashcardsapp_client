<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="bg-white w-full mx-4 px-5 py-6 md:w-2/5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <header class="text-3xl font-bold mb-5">FLASHLEARN</header>

      <section v-show="isLoginContainerOpen" class="login-box">
        <b-field label="Username">
          <b-input v-model="loginUsername"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" v-model="loginPassword"></b-input>
        </b-field>

        <div
          class="flex flex-col md:items-center md:flex-row"
          style="margin-top: 24px;"
        >
          <BaseButton
            title="Log In"
            button-color="green"
            @on-clicked="login()"
          />

          <div
            class="ml-4 mt-4 md:mt-0 underline hover:no-underline cursor-pointer"
            @click="isLoginContainerOpen = false"
          >
            Create new account (no email required)
          </div>
        </div>
      </section>

      <section v-show="!isLoginContainerOpen" class="register-box">
        <b-field label="Name">
          <b-input v-model="registerName"></b-input>
        </b-field>

        <b-field label="Username">
          <b-input v-model="registerUsername"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" v-model="registerPassword"></b-input>
        </b-field>

        <b-field label="Confirm Password">
          <b-input type="password" v-model="registerConfirmPassword"></b-input>
        </b-field>

        <div class="flex items-center" style="margin-top: 24px;">
          <BaseButton
            title="Create Account"
            button-color="green"
            @on-clicked="loginAsGuest()"
          />
          <div
            class="ml-4 underline hover:no-underline cursor-pointer"
            @click="resetForm()"
          >
            Go back
          </div>
        </div>
      </section>

      <div class="separator my-4">OR</div>

      <div>
        <BaseButton title="Try out the app" @on-clicked="loginAsGuest()" />
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    BaseButton,
  },

  data() {
    return {
      isLoginContainerOpen: true,
      loginUsername: "",
      loginPassword: "",

      registerName: "",
      registerUsername: "",
      registerPassword: "",
      registerConfirmPassword: "",
    };
  },

  methods: {
    ...Vuex.mapActions(["authLogin"]),

    async login() {
      const formData = new FormData();
      formData.append("username", this.loginUsername);
      formData.append("password", this.loginPassword);
      const result = await this.authLogin(formData);
      if (result.success) {
        this.$router.replace({ name: "PageHome" });
      }
    },

    async loginAsGuest() {
      const formData = new FormData();
      formData.append("username", "guest");
      formData.append("password", "guest@123");
      const result = await this.authLogin(formData);
      if (result.success) {
        this.$router.replace({ name: "PageHome" });
      }
    },

    resetForm() {
      this.registerName = "";
      this.registerUsername = "";
      this.registerPassword = "";
      this.registerConfirmPassword = "";
      this.isLoginContainerOpen = true;
    },
  },
};
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid lightgray;
}

.separator:not(:empty)::before {
  margin-right: 0.25em;
}

.separator:not(:empty)::after {
  margin-left: 0.25em;
}
</style>
