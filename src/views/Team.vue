<template>
 <div class="team">
   <div v-for="(pokemon, index) in team" :key="`team-${pokemon.id}-${index}`">
     <pokemon :pokemon="pokemon" />
   </div>
 </div>
</template>

<style scoped>

.team {
  display: grid;
  grid-template-columns: repeat(6, 90px);
  align-items: center;
  background-color: #fff;
  margin: auto;
}

</style>

<script>
import Pokemon from '../components/Pokemon'
export default {
  name: 'Team',
  components: {
    Pokemon
  },
  methods: {
    getTeam () {
      return this.$store.getters.getTeam
    }
  },
  computed: {
    team () {
      return this.getTeam()
    }
  }
}
</script>
