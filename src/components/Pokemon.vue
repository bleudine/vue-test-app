<template>
 <router-link :to="`/pokemon/${pokemon.name}`" class="pokemon-link">
   <div class="pokemon">
     <slot name="header"></slot>
     <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
     <slot name="footer"></slot>
   </div>
 </router-link>
</template>

<style>
.pokemon-link {
  display: block;
}

.pokemon {
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  width: 100%;
}

.pokemon-name {
  text-transform: capitalize;
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
  },

}
</script>

<style scoped lang="scss">

</style>
