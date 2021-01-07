<template>
 <router-link :to="`/pokemon/${pokemon.name}`" class="pokemon-link">
   <div class="pokemon">
     <slot name="header"></slot>
     <img alt="pokemon-sprite" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
     <slot name="footer"></slot>
   </div>
 </router-link>
</template>

<style>
.pokemon-link {
  display: block;
  text-decoration: none;
}

.pokemon {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 96px;
  padding: 8px;
}

img {
  width: 100%;
  height: auto;
  margin: auto;
  display: block;
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

<script>
export default {
// TODO add background color to each pokemon in list based on type's color with .5 opacity and BONUS: gradient in case of double type
  name: 'Pokemon',
  props: {
    pokemon: Object
  }

}
</script>

<style scoped lang="scss">

</style>
