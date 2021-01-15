import Vue from 'vue'
import Vuex from 'vuex'
import resources from '../assets/resources.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    team: [],
    types: [],
    savedTeams: {},
    typeTable: []
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
    },
    getTypeTable: (state) => {
      return state.typeTable
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
      const { pokemons, types, savedTeams, typeTable } = data
      state.savedTeams = savedTeams
      state.pokemons = pokemons
      state.types = Array.from(types).sort()
      state.selectedTypes = Array.from(types)
      state.typeTable = typeTable
    }
  },
  actions: {
    loadResources ({ commit }) {
      const storedTeams = localStorage.getItem('savedTeams')
      fetch('https://pokeapi.co/api/v2/type').then(resp => resp.json()).then(({ results }) => {
        Promise.all(results.map(({ url }) => new Promise((resolve, reject) => {
          fetch(url)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
        }))).then(results => {
          const typeTable = resources.types.map((type) => {
            const currentType = results.find(({ name }) => name === type)
            return resources.types.reduce((acc, t) => {
              const damageRelations = Object.entries(currentType.damage_relations).filter(([key]) => {
                return key.includes('from')
              }).map(([key, value]) => [key, value.map(type => type.name)])
              const relation = damageRelations.find(([, relations]) => relations.includes(t))
              let multipl = 1
              if (relation) {
                const [modifier] = relation
                switch (modifier) {
                  case 'no_damage_from':
                    multipl = 0
                    break
                  case 'half_damage_from':
                    multipl = 0.5
                    break
                  case 'double_damage_from':
                    multipl = 2
                    break
                }
              }
              return { ...acc, [t]: multipl }
            }, { name: type })
          })
          commit('setResources', { ...resources, typeTable, savedTeams: storedTeams ? JSON.parse(storedTeams) : {} })
        }).catch(console.error)
      })
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
