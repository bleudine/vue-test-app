<template>
  <div @click="navigate(pokemon.name)" class="pokemon-link">
    <div class="pokemon-gradient" :style="cssVars"/>
    <div class="pokemon">
      <slot name="header"></slot>
      <img class="pokemon-sprite" alt="pokemon-sprite"
           :src="sprite"/>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import colors from '../assets/colors.json'
export default {
// TODO add background color to each pokemon in list based on type's color with .5 opacity and BONUS: gradient in case of double type
  name: 'Pokemon',
  props: {
    pokemon: Object,
    sprite: String
  },
  computed: {
    cssVars () {
      const [first, second] = this.pokemon.types
      if (second) {
        return {
          '--first': colors[first.type.name],
          '--second': colors[second.type.name]
        }
      }
      return {
        '--first': colors[first.type.name],
        '--second': colors[first.type.name]
      }
    }
  },
  methods: {
    navigate (name) {
      this.$router.replace({ name: 'Home', query: { pokemon: name } })
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-link {
  display: block;
  text-decoration: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .2);
  border-radius: 4px;
  background-color: #f0f0f0;
  position: relative;

  .pokemon-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    $first: var(--first);
    $second: var(--second);
    background: linear-gradient(140deg, $first, $second);
    opacity: .5;
    border-radius: 4px;
  }

}

.pokemon {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 96px;
  padding: 8px;
  z-index: 2;
  position: relative;
  background-color: transparent;
}

img {
  width: initial;
  height: auto;
  margin: auto;
  display: block;
}

.pokemon-sprite {

  animation: unblur 500ms;
}

@keyframes unblur {
  from {
    filter: blur(10px);
  }
  to {
    filter: none;
  }
}
</style>
