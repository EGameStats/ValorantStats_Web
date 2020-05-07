<template>
  <login v-if="isLogin" @switchAuth="flipIsLogin"></login>
  <register v-else @switchAuth="flipIsLogin"></register>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register"

export default {
  name: 'auth',
  components: {
    Login,
    Register
  },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    flipIsLogin() {
      this.isLogin = !this.isLogin;
    }
  }
}
</script>

<style>

</style>