import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  authUser: null,
  userDoc: null
})

export const mutations =  {
  ...vuexfireMutations,
  RESET_STORE: (state) => {
    state.authUser = null;
    state.userDoc = null;
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    };
  },
  SET_USER_DOCUMENT: (state, userDocument) => {
    // Only needed for SSR/Universal Mode
    state.userDoc = userDocument
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    if (this.$fireAuth === null) {
      throw 'nuxtServerInit Example not working - this.$fireAuth cannot be accessed.'
    }

    if (ctx.$fireAuth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
    }

    if (ctx.app.$fireAuth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user
  
      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims
      })

    }
  },

  bindUserDoc: firestoreAction(async function ({ state, bindFirestoreRef }) {
    if(!state.authUser) return;
    const ref = this.$fireStore
      .collection('users')
      .doc(state.authUser.uid)
    await bindFirestoreRef('userDoc', ref, { wait: true })
  }),

  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    } 
    commit('SET_AUTH_USER', { authUser })
  },
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },
  userDocument(state) {
    return state.userDoc;
  }
}