<template>
  <div class="container">
    <div class="columns is-mobile">
      <div class="column is-half">
        <h1 class="title is-1">Check your group performance</h1>
        <h2 class="title is-2">View people side-by-side</h2>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title is-2">Already in game?</p>
            <button class="button is-primary is-large">See your teammates stats</button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column" v-for="(player, index) in selectedIds" :key="player + index">
        <card-premade :riotId="player" @click.native="player ? null : addPlayer(index)"></card-premade>
      </div>
    </div>
  </div>
</template>

<script>
import CardPremade from "../components/CardPremade";
import AddPlayerModal from "../components/AddPlayerModal"

export default {
  name: "premades",
  components: {
    CardPremade,
  },
  data() {
    return {
      selectedIds: [null, null, null, null, null]
    };
  },
  methods: {
    addPlayer(index) {
      console.log(index);
      this.$buefy.modal.open({
        parent: this,
        component: AddPlayerModal,
        props: { index },
        events: {
          'set-player': value => {
            this.$set(this.selectedIds, value['index'], value['playerId'])
          }
        },
        hasModalCard: true,
        trapFocus: true
      })
    }
  }
};
</script>

<style>
</style>