<template>
  <div class="team">
    {{getTeam}}
  </div>
</template>

<script>
export default {
  name: 'Team',
  methods: {
    getTeam () {
      return this.$store.getters.getTeam()
    }
  }
}
</script>

<style scoped>

</style>
