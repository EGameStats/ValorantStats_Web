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
        <card-premade :riotId="player" @click.native="player ? null : addPlayer(index)" @deletePlayer="deletePlayer($event)"></card-premade>
      </div>
    </div>
  </div>
</template>

<script>
import CardPremade from "../components/CardPremade";
import AddPlayerModal from "../components/AddPlayerModal";

export default {
  name: "premades",
  components: {
    CardPremade
  },
  asyncData({ query }) {
    let selectedIds = [null, null, null, null, null];
    Object.keys(query).forEach(indexStr => {
      let index = parseInt(indexStr);
      selectedIds[index] = query[index];
    });
    return { selectedIds };
  },
  methods: {
    addPlayer(index) {
      this.$buefy.modal.open({
        parent: this,
        component: AddPlayerModal,
        props: { index },
        events: {
          "set-player": value => {
            let newQuery = {}
            this.$set(this.selectedIds, value["index"], value["playerId"]);
            newQuery[value["index"]] = value["playerId"];
            this.$router.push({query: { ...this.$route.query, ...newQuery }})
          }
        },
        hasModalCard: true,
        trapFocus: true
      });
    },
    deletePlayer(playerId) {
      let newQuery = {};
      let index = this.selectedIds.indexOf(playerId);
      this.$set(this.selectedIds, index, null);
      this.selectedIds.forEach((value, index) => {
        if (value)
          newQuery[index] = value;
      })
      this.$router.push({query: newQuery})
    }
  }
};
</script>

<style>
</style>