<template>
  <div class="team-view">
    <div v-for="(pokemon, index) in team" :key="`team-${index}`">
      <pokemon-details :id="pokemon.name"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PokemonDetails from '@/components/PokemonDetails'

export default {
  name: 'Team',
  components: { PokemonDetails },
  computed: {
    ...mapGetters({
      team: 'getTeam'
    })
  }
}
</script>

<style lang="scss">

.team-view {
  display: grid;
  grid-template-columns: repeat(3, .8fr);
  align-items: center;
  grid-gap: 12px;
  padding: 12px;
  height: 100%;
  font-size: 14px;
  color: #f0f0f0;
  text-transform: capitalize;

  .container {
    background-color: #ee1515;
    margin: auto;
    padding: 12px;
    border-radius: 4px;
    align-items: center;
  }

  .pokemon-details-image-container, img {
    width: initial;
  }
}

</style>
