<template>
  <div id="app" data-app>
    <div id="nav" ref="nav">
      <div class="nav-link-container">
        <router-link to="/pokemon">Home</router-link>
        |
        <router-link to="/team">My team</router-link>
        |
        <router-link to="/types">Type Table</router-link>
      </div>
      <list-filters v-on:filter-change="filterPokemons"></list-filters>
      <div class="saved-teams">
        <ul>
          <li v-for="name in savedTeamNames" :key="name">
            <v-btn @click="loadTeam(name)">{{ name }}</v-btn>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrapper">
      <router-view :pokemons="pokemons"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListFilters from '@/components/ListFilters'

// TODO add new routes with pokemon table type (see https://www.pokebip.com/page/jeuxvideo/table-des-types)
// TODO to achieve this use data table

// TODO use API instead of local resources ffs
// TODO use translation (french version alongside engrish version) with vue-i18n

// single view pokemon
// TODO display weakness table
// TODO display pokemon evolutions

export default {
  components: {
    ListFilters
  },
  data () {
    return {
      pokemons: []
    }
  },
  created () {
    this.$store.dispatch('loadResources')
  },
  methods: {
    loadTeam (name) {
      this.$store.dispatch('loadTeam', { name })
    },
    filterPokemons ({ tags, selectedTypes }) {
      const loweredTags = tags.map(s => s.toLowerCase())
      this.pokemons = Object.values(this.getPokemons).filter(({
        types,
        name: pokemonName
      }) => loweredTags.includes(pokemonName) || types.some(({ type: { name } }) => tags.length > 0 ? loweredTags.includes(name) : selectedTypes.includes(name)))
    }
  },
  computed: {
    ...mapGetters({
      savedTeams: 'getSavedTeams',
      getPokemons: 'getPokemonList'
    }),
    savedTeamNames () {
      return Object.keys(this.savedTeams)
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
}

#nav {
  padding: 30px;
  background-color: #003a70;
  min-width: 20vw;

  .nav-link-container {

    a {
      font-weight: bold;
      color: #3d7dca;

      &.router-link-exact-active {
        color: #f0f0f0;
        text-decoration: none;
      }
    }
  }

  .type-filter-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 18em;
    margin: 32px 0;

    .type-filter {
      margin: 2px;
      width: 48px;
      padding: 1px;
      cursor: pointer;

      img {
        display: block;
        width: 100%;
        margin: auto;
        filter: opacity(.5);
      }

      &.--selected {
        img {
          filter: none;
        }
      }
    }
  }
}

.wrapper {
  flex-grow: 1;
  height: 100vh;
  overflow-y: scroll;
  background-color: #ffcb55;
  position: relative;
}

.my-team {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: #2c3e50;
  border: 1px solid
}

.saved-teams {
  color: #fefefe;

  ul {

    list-style-type: none;
  }
}

* > * {
  box-sizing: border-box;
}
</style>
