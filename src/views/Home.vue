<template>
  <div class="home">
    <div v-for="poke in pokemons" :key="poke">
      <pokemon :pokemon="poke" />
    </div>
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue'
import data from '@/assets/data.json'

export default {
  name: 'Home',
  components: {
    Pokemon
  },
  computed: {
    pokemons () {
      return data.data
    }
  }
}
</script>
