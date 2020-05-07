<template>
  <div class="columns is-centered is-vcentered" style="min-height: 100vh">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <h3 class="title is-3">Register</h3>
          <form>
            <b-field
              :message="nickValid ? null : 'Invalid Nickname'"
              :type="nickValid ? null : 'is-danger'"
            >
              <b-input
                placeholder="Profile Name"
                size="is-large"
                icon="account"
                v-model.lazy="nick"
              ></b-input>
            </b-field>
            <b-field
              :message="emailValid ? null : 'Do not leave this field empty'"
              :type="emailValid ? null: 'is-danger'"
            >
              <b-input
                placeholder="Email"
                size="is-large"
                icon="email"
                v-model.lazy="email"
                type="email"
              ></b-input>
            </b-field>
            <b-field
              :message="passValid ? null : 'Password must be at least 6 characters long'"
              :type="passValid ? null : 'is-danger'"
            >
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
              @click.prevent="register"
              :loading="isLoading"
            >Register</b-button>
            <a @click="switchAuth">Already have an account? Login</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
      nick: "",
      nickValid: true,
      passValid: true,
      emailValid: true,
      isLoading: false
    };
  },
  methods: {
    async register() {
      if (this.validate()) {
        this.isLoading = true;
        try {
          const userObject = await this.$fireAuth.createUserWithEmailAndPassword(
            this.email,
            this.pass
          );
          await this.$fireStore.collection('users').doc(userObject.user.uid).set({name: this.nick, email: this.email})
          this.isLoading = false;
          this.$router.push({ path: "/profile" });
        } catch (e) {
          this.isLoading = false;
          const errorCode = e.code;
          let errorMessage = e;
          if (errorCode === "auth/email-already-in-use")
            errorMessage = "The email is already taken. Try another one";
          if (errorCode === "auth/invalide-email")
            errorMessage = "The email is badly formatted. Check it out";
          if (errorCode === "auth/weak-password")
            errorMessage = "The password should be at least 6 characters long";
          this.isLoading = false;
          this.$buefy.notification.open({
            duration: 5000,
            message: errorMessage,
            position: "is-top-right",
            type: "is-danger",
            hasIcon: true
          });
        }
      }
    },
    switchAuth() {
      this.$emit("switchAuth");
    },
    validate() {
      if (this.email.trim() == "") this.emailValid = false;
      else this.emailValid = true;

      if (this.pass.trim() == "" || this.pass.length < 6)
        this.passValid = false;
      else this.passValid = true;

      if (this.nick.trim() == "") this.nickValid = false;
      else this.nickValid = true;

      if (this.emailValid && this.passValid && this.nickValid) return true;
      return false;
    }
  }
};
</script>

<style>
</style>