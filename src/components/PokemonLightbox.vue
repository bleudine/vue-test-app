<template>
  <div v-on:scroll.prevent="" class="pokemon-lightbox" :style="{left: left}">
    <div @click="closeLightbox" class="lightbox-background"></div>
    <div class="lightbox-content">
     <pokemon-details :id="id" />
    </div>
  </div>
</template>

<style lang="scss">

body {
  margin: 0
}

.pokemon-lightbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.lightbox-background {
  background-color: rgba(0, 0, 0, .9);
  display: block;
  height: 100%;
  width: 100%;
}

.lightbox-content {
  position: absolute;
  background-color: #ee1515;
  padding: 32px;
  border-radius: 8px;
}
</style>

<script>
import PokemonDetails from '@/components/PokemonDetails'
export default {
  name: 'Lightbox',
  components: {
    PokemonDetails
  },
  data () {
    return {
      left: 0
    }
  },
  mounted () {
    this.left = `${this.$parent.$parent.$refs.nav.offsetWidth}px`
  },
  computed: {
    id () {
      return this.$route.query.pokemon
    }
  },
  methods: {
    closeLightbox () {
      this.$emit('close-lightbox')
    }
  }
}
</script>
