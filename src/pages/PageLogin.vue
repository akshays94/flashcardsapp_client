<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="bg-white w-full mx-4 px-5 py-6 md:w-2/5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <header class="text-3xl font-bold mb-5">🍇&nbsp;FLASHLEARN</header>

      <section v-show="isLoginContainerOpen" class="login-box">
        <b-field
          label="Username"
          :type="loginFormErrors.username.hasError ? 'is-danger' : ''"
          :message="loginFormErrors.username.message"
        >
          <b-input v-model="loginUsername" @input="resetErrors()"></b-input>
        </b-field>

        <b-field
          label="Password"
          :type="loginFormErrors.password.hasError ? 'is-danger' : ''"
          :message="loginFormErrors.password.message"
        >
          <b-input
            type="password"
            v-model="loginPassword"
            @input="resetErrors()"
          ></b-input>
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
            class="ml-4 mt-4 md:mt-0 underline hover:no-underline cursor-pointer font-bold hover:text-purple-700 transition-all"
            @click="isLoginContainerOpen = false"
          >
            Create new account (no email required)
          </div>
        </div>
      </section>

      <section v-show="!isLoginContainerOpen" class="register-box">
        <b-field
          label="Name"
          :type="registerFormErrors.name.hasError ? 'is-danger' : ''"
          :message="registerFormErrors.name.message"
        >
          <b-input v-model.trim="registerName" @input="resetErrors()"></b-input>
        </b-field>

        <b-field
          label="Username"
          :type="registerFormErrors.username.hasError ? 'is-danger' : ''"
          :message="registerFormErrors.username.message"
        >
          <b-input
            v-model.trim="registerUsername"
            @input="resetErrors()"
          ></b-input>
        </b-field>

        <b-field
          label="Password"
          :type="registerFormErrors.password.hasError ? 'is-danger' : ''"
          :message="registerFormErrors.password.message"
        >
          <b-input
            type="password"
            v-model.trim="registerPassword"
            @input="resetErrors()"
          ></b-input>
        </b-field>

        <b-field
          label="Confirm Password"
          :type="registerFormErrors.confirmPassword.hasError ? 'is-danger' : ''"
          :message="registerFormErrors.confirmPassword.message"
        >
          <b-input
            type="password"
            v-model.trim="registerConfirmPassword"
            @input="resetErrors()"
          ></b-input>
        </b-field>

        <div class="flex items-center" style="margin-top: 24px;">
          <BaseButton
            title="Create Account"
            button-color="green"
            @on-clicked="createAccount()"
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

      loginFormErrors: {
        username: { hasError: false, message: "" },
        password: { hasError: false, message: "" },
      },

      registerName: "",
      registerUsername: "",
      registerPassword: "",
      registerConfirmPassword: "",

      registerFormErrors: {
        name: { hasError: false, message: "" },
        username: { hasError: false, message: "" },
        password: { hasError: false, message: "" },
        confirmPassword: { hasError: false, message: "" },
      },
    };
  },

  created() {
    document.title = `Flashlearn`;
  },

  methods: {
    ...Vuex.mapActions(["authLogin", "authCreateNewAccount"]),
    async loginAsGuest() {
      const formData = new FormData();
      formData.append("username", "guest");
      formData.append("password", "guest@123");
      const result = await this.authLogin(formData);
      if (result.success) {
        this.$router.replace({ name: "PageHome" });
      }
    },

    async login() {
      let hasNoErrors = true;

      if (this.loginUsername === "") {
        this.loginFormErrors.username.hasError = true;
        this.loginFormErrors.username.message = "Username required";
        hasNoErrors = false;
      }

      if (this.loginPassword === "") {
        this.loginFormErrors.password.hasError = true;
        this.loginFormErrors.password.message = "Password required";
        hasNoErrors = false;
      }

      if (hasNoErrors) {
        const formData = new FormData();
        formData.append("username", this.loginUsername);
        formData.append("password", this.loginPassword);
        const result = await this.authLogin(formData);
        if (result.success) {
          this.$router.replace({ name: "PageHome" });
        } else {
          if (result.status === 401) {
            this.loginFormErrors.password.hasError = true;
            this.loginFormErrors.password.message = result.message;
          }
        }
      }
    },

    resetForm() {
      this.registerName = "";
      this.registerUsername = "";
      this.registerPassword = "";
      this.registerConfirmPassword = "";
      this.isLoginContainerOpen = true;
    },

    resetErrors() {
      this.loginFormErrors = {
        username: { hasError: false, message: "" },
        password: { hasError: false, message: "" },
      };
      this.registerFormErrors = {
        name: { hasError: false, message: "" },
        username: { hasError: false, message: "" },
        password: { hasError: false, message: "" },
        confirmPassword: { hasError: false, message: "" },
      };
    },

    async createAccount() {
      let hasNoErrors = true;

      if (this.registerName === "") {
        this.registerFormErrors.name.hasError = true;
        this.registerFormErrors.name.message = "Name required";
        hasNoErrors = false;
      }

      if (this.registerUsername === "") {
        this.registerFormErrors.username.hasError = true;
        this.registerFormErrors.username.message = "Username required";
        hasNoErrors = false;
      }

      if (this.registerPassword === "") {
        this.registerFormErrors.password.hasError = true;
        this.registerFormErrors.password.message = "Password required";
        hasNoErrors = false;
      }

      if (this.registerConfirmPassword === "") {
        this.registerFormErrors.confirmPassword.hasError = true;
        this.registerFormErrors.confirmPassword.message = "Password required";
        hasNoErrors = false;
      }

      if (this.registerPassword !== this.registerConfirmPassword) {
        this.registerFormErrors.confirmPassword.hasError = true;
        this.registerFormErrors.confirmPassword.message =
          "Passwords don't match";
        hasNoErrors = false;
      }

      if (hasNoErrors) {
        const result = await this.authCreateNewAccount({
          name: this.registerName,
          username: this.registerUsername,
          password: this.registerPassword,
        });
        if (result.success) {
          this.registerName = "";
          this.registerUsername = "";
          this.registerPassword = "";
          this.registerConfirmPassword = "";
          this.isLoginContainerOpen = true;
        } else {
          if (result.status === 409) {
            this.registerFormErrors.username.hasError = true;
            this.registerFormErrors.username.message = result.message;
          }
        }
      }
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
