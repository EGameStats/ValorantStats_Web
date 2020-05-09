<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar position="fixed" open type="is-background" can-cancel="null">
        <div class="p-1">
          <div class="block">
            <img src="~/assets/valorantStatsLogo.svg" alt="ValorantStats Logo" />
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-item icon="home" label="Home" tag="nuxt-link" to="/"></b-menu-item>
              <b-menu-item icon="account" label="Profile" tag="nuxt-link" to="/profile"></b-menu-item>
              <b-menu-item icon="account-group" label="Premades" tag="nuxt-link" to="/premades"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item icon="logout" label="Logout" @click.prevent="logout"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
      <div class="p-1 content-calc" style="margin-left: auto">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      try {
        await this.$fireAuth.signOut();
        this.$buefy.toast.open({
          message: "Logged out",
          type: "is-success"
        });
        this.$router.push({ path: "/" });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Something went wrong",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
  }
}
@media screen and (max-width: 1023px) {
  .content-calc {
    width: calc(100% - 80px);
  }
  .b-sidebar {
    .sidebar-content {
      z-index: 0;
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .content-calc {
    width: calc(100% - 260px);
  }
  .b-sidebar {
    .sidebar-content {
      z-index: 0;
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
