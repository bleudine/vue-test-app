<template>
  <div class="pokemon">
    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getNumber}.png`" />
    {{pokemon.name}} - <button @click="something">Add to team</button>
  </div>
</template>

<script>
export default {
  name: 'Pokemon',
  props: {
    pokemon: String
  },
  methods: {
    something () {
      this.$store.commit('addToTeam', this.pokemon)
    },
    getNumber () {
      return this.pokemon.url.split('/')[this.pokemon.url.split('/').length - 2]
    }
  }
}
</script>

<style scoped lang="scss">

</style>
