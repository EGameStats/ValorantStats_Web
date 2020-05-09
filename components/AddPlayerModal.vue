<template>
  <div class="card">
    <div class="card-content">
      <b-field>
        <b-input icon="account" placeholder="RiotID" size="is-large" v-model="playerId"></b-input>
      </b-field>
      <button class="button is-primary is-large" @click="setPlayer">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    }
  },
  data() {
    return {
      playerId: '',
    }
  },
  methods: {
    setPlayer() {
      this.$emit('set-player', { index: this.index, playerId: this.playerId })
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>