import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    team: []
  },
  getters: {
    getTeam: (state) => {
      return state.team
    }
  },
  mutations: {
    addToTeam (state, pokemon) {
      state.team = pokemon
    }
  },
  actions: {
  },
  modules: {
  }
})
