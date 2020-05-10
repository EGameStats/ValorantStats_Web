<template>
  <div>
    <h1 class="title is-1">You are logged in</h1>
    <h2 class="title is-2">You will be notified when we go live!</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "profile",
  middleware: 'authenticated',
  computed: {
    ...mapState({
      authUser: state => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      userDoc: "userDocument"
    })
  },
  /** Get data on Server Side: */
  async fetch({ app, store }) {
    if (process.browser || !store.authUser) return;
    try {
      const ref = app.$fireStore
        .collection("users")
        .doc(store.authUser.uid);
      const userDoc = await ref.get();
      store.commit("SET_USER_DOCUMENT", userDoc.data());
    } catch (e) {
      console.error(e);
    }
  },
  /**  Bind Vuexfire on client-side: */
  async mounted() {
    if(!this.isLoggedIn) return;
    try {
      await this.$store.dispatch("bindUserDoc");
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
</style>