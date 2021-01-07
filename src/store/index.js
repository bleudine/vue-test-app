import Vue from 'vue'
import Vuex from 'vuex'
import resources from '../assets/resources.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    team: [],
    types: [],
    selectedTypes: []
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
    },
    getTypes: (state) => {
      return state.types
    },
    getSelectedTypes: (state) => {
      return state.selectedTypes
    }
  },
  mutations: {
    addToTeam (state, pokemon) {
      state.team.push(pokemon)
    },
    setResources (state, data) {
      const { pokemons, types } = data
      state.pokemons = pokemons
      state.types = Array.from(types)
      state.selectedTypes = Array.from(types)
    },
    setSelectedTypes (state, type) {
      const isSelected = state.selectedTypes.includes(type)
      if (!isSelected) {
        state.selectedTypes.push(type)
      } else {
        state.selectedTypes.splice(state.selectedTypes.indexOf(type), 1)
      }
    }
  },
  actions: {
    loadResources ({ commit }) {
      commit('setResources', resources)
    },
    addToTeam ({ commit }, { pokemon }) {
      commit('addToTeam', pokemon)
    },
    setSelectedType ({ commit }, { type }) {
      commit('setSelectedTypes', type)
    }
  },
  modules: {
  }
})
