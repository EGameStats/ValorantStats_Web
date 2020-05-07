<template>
  <div class="columns is-centered is-vcentered" style="min-height: 100vh">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Log in</h3>
          <form>
            <b-field>
              <b-input placeholder="Email" size="is-large" icon="email" v-model="email"></b-input>
            </b-field>
            <b-field>
              <b-input
                placeholder="Password"
                size="is-large"
                type="password"
                icon="key"
                password-reveal
                v-model="pass"
              ></b-input>
            </b-field>
            <b-button
              type="is-primary is-large"
              expanded
              @click.prevent="signIn"
              :loading="isLoading"
            >Log in</b-button>
            <a @click="switchAuth">Don't have an account? Register</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
      isLoading: false
    };
  },
  methods: {
    async signIn() {
      try {
        this.isLoading = true;
        await this.$fireAuth.signInWithEmailAndPassword(this.email, this.pass);
        this.isLoading = false;
      } catch (e) {
        const errorCode = e.code;
        let errorMessage = "";
        if (errorCode === "auth/invalid-email")
          errorMessage = "The email is badly formatted, check it out";
        if (errorCode === "auth/user-disabled")
          errorMessage = "This account has been banned";
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        )
          errorMessage = "Wrong email or password, try again";
        this.isLoading = false;
        this.$buefy.notification.open({
          duration: 5000,
          message: errorMessage,
          position: "is-top-right",
          type: "is-danger",
          hasIcon: true
        });
      }
    },
    switchAuth() {
      this.$emit('switchAuth')
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  watch: {
    isLoggedIn(newStatus, oldStatus) {
      if (newStatus) {
        this.$router.push({ path: "/profile" });
      }
    }
  }
};
</script>

<style>
</style>