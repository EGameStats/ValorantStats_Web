<template>
  <div class="card">
    <div class="card-image" v-if="riotId">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content" v-if="riotId">
      <p class="title is-4">{{ riotId }}</p>
      <p class="title is-4">Rank</p>
    </div>
    <div
      class="card-content has-text-centered is-centered is-flex is-vcentered"
      style="height: 15em; justify-content: center; align-items: center"
      v-else
    >
      <div>
        <b-icon icon="plus" size="is-large" type="is-primary" />
        <p class="title is-4">Add Player</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["riotId"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
  .card {
    cursor: pointer;
  }
</style>