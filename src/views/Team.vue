<template>
  <div class="team">

  </div>
</template>

<style lang="scss">

</style>

<script>

export default {
  name: 'Team',
  computed: {
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
