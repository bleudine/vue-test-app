import Vue from 'vue'
import Vuex from 'vuex'
import resources from '../assets/resources.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    team: [],
    types: [],
    savedTeams: {}
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
    getSavedTeams: (state) => {
      return state.savedTeams
    }
  },
  mutations: {
    addToTeam (state, pokemon) {
      state.team.push(pokemon)
      if (state.team.length > 6) {
        state.team.shift()
      }
    },
    removeFromTeam (state, index) {
      state.team.splice(index, 1)
    },
    saveTeam (state, title) {
      state.savedTeams = {
        ...state.savedTeams,
        [title]: state.team.map(({ name }) => name)
      }
    },
    loadTeam (state, team) {
      state.team = team
    },
    setResources (state, data) {
      const { pokemons, types, savedTeams } = data
      state.savedTeams = savedTeams
      state.pokemons = pokemons
      state.types = Array.from(types)
      state.selectedTypes = Array.from(types)
    }
  },
  actions: {
    async loadResources ({ commit }) {
      const storedTeams = localStorage.getItem('savedTeams')
      commit('setResources', { ...resources, savedTeams: storedTeams ? JSON.parse(storedTeams) : {} })
    },
    addToTeam ({ commit }, { pokemon }) {
      commit('addToTeam', pokemon)
    },
    removeFromTeam ({ commit }, { index }) {
      commit('removeFromTeam', index)
    },
    loadTeam ({ commit, state }, { name }) {
      const team = state.savedTeams[name].map((pokemonName) => state.pokemons[pokemonName])
      commit('loadTeam', team)
    },
    saveTeam ({ commit, state }, { title }) {
      const storedTeams = localStorage.getItem('savedTeams')
      const savedTeams = JSON.parse(storedTeams)
      localStorage.setItem('savedTeams', JSON.stringify({ ...savedTeams, [title]: state.team.map(({ name }) => name) }))
      commit('saveTeam', title)
    }
  }
})
