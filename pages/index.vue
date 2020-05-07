<template>
  <div>
    <section class="section">
      <div class="columns is-mobile">
        <div class="column has-text-centered">
          <h1 class="title is-1 valorant">Track your stats</h1>
          <b-field>
            <b-input placeholder="Enter your RiotID" size="is-large" icon="account" expanded></b-input>
            <p class="control">
              <button class="button is-primary is-large">Search</button>
            </p>
          </b-field>
          <h4 class="title is-4">Log in to view your stats and match history</h4>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column">
          <card-img-top title="View your performance"></card-img-top>
        </div>
        <div class="column">
          <card-img-top title="Analyze past games"></card-img-top>
        </div>
        <div class="column">
          <card-img-top title="View premade group performance"></card-img-top>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CardIcon from "~/components/CardIcon";
import CardImgTop from "~/components/CardImgTop";

export default {
  name: "home",

  components: {
    CardIcon,
    CardImgTop
  },
};
</script>
