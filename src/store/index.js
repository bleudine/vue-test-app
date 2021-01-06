import Vue from 'vue'
import Vuex from 'vuex'
import resources from '../assets/resources.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    team: [],
    types: []
  },
  getters: {
    getTeam: (state) => {
      return state.team
    },
    getPokemon: (state) => id => {
      return state.pokemons[id]
    },
    getPokemonList: (state) => {
      return Object.values(state.pokemons)
    }
  },
  mutations: {
    addToTeam (state, pokemon) {
      state.team.push(pokemon)
    },
    setResources (state, data) {
      const { pokemons, types } = data
      state.pokemons = pokemons
      state.types = types
    }
  },
  actions: {
    loadResources ({ commit }) {
      commit('setResources', resources)
    },
    addToTeam ({ commit }, { pokemon }) {
      commit('addToTeam', pokemon)
    }
  },
  modules: {
  }
})
