<template>
  <div class="home">
    <div class="team" v-if="team.length > 0">
      <div class="pokemon-team" v-for="(pokemon, index) in team" :key="`team-${index}`">
        <pokemon :pokemon="pokemon" :sprite="pokemon.sprites['front_default']">
          <template v-slot:header>
            <button class="remove-button" @click.prevent="removeFromTeam(index)">x</button>
          </template>
        </pokemon>
      </div>
    </div>
    <div class="pokemon-list">
      <div class="pokemon-container" v-for="poke in pokemons" :key="poke.id">
        <pokemon :pokemon="poke" :sprite="poke.sprites['front_default']">
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
  justify-content: center;
  width: 100%;
  max-width: 100%;
  position: sticky;
  top: 0;
  background-color:#ee1515;
  box-shadow: 0 2px 2px 0 rgba(44, 62, 80, .2);
  z-index: 11;
  padding: 8px;

  .pokemon-team {
    margin: 12px;
    border-radius: 4px;
    background: #f0f0f0;
    box-shadow: 0 2px 2px 0 rgba(44, 62, 80, .2);
    position: relative;

    .remove-button {
      position: absolute;
      top: -5px;
      right: -5px;
      border:none;
      border-radius: 50%;
    }
  }
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
    },
    removeFromTeam (index) {
      this.$store.dispatch('removeFromTeam', { index })
    }
  }
}
</script>
