<template>
  <div class="home">
    <div class="team">
      <div v-for="(pokemon, index) in team" :key="`team-${index}`">
        <pokemon :pokemon="pokemon"/>
      </div>
    </div>
    <div class="pokemon-list">
      <div class="pokemon-container" v-for="poke in pokemons" :key="poke.id">
        <pokemon :pokemon="poke">
          <template v-slot:header>
            <span class="pokemon-name">{{ poke.name }}</span>
          </template>
          <template v-slot:footer>
            <button @click.prevent="addToTeam(poke)">Add to team</button>
          </template>
        </pokemon>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.team {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow-x: scroll;
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
}

.pokemon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50em;
  margin: auto;
}

.pokemon-container {
  margin: 8px;
  background-color: #f0f0f0;
}

.pokemon-name {
  text-transform: capitalize;
}
</style>

<script>
import Pokemon from '../components/Pokemon.vue'

export default {
  name: 'Home',
  components: {
    Pokemon
  },
  computed: {
    pokemons () {
      return this.$store.getters.getPokemonList.filter(({ types }) => types.some(({ type: { name } }) => this.$store.getters.getSelectedTypes.includes(name)))
    },
    team () {
      return this.$store.getters.getTeam
    }
  },
  methods: {
    addToTeam (pokemon) {
      this.$store.dispatch('addToTeam', { pokemon })
    }
  }
}
</script>
