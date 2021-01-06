<template>
  <div class="home">
    <div class="pokemon-list">
       <div v-for="poke in pokemons" :key="poke.id">
         <pokemon :pokemon="poke">
           <template v-slot:header>
             <span class="pokemon-name">{{poke.name}}</span>
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

<style>
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
  margin-bottom: 120px;
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
      return this.$store.getters.getPokemonList
    }
  },
  methods: {
    addToTeam (pokemon) {
      this.$store.dispatch('addToTeam', { pokemon })
    }
  }
}
</script>
