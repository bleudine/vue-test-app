<template>
  <div v-on:scroll.prevent="" class="pokemon-lightbox" v-scroll-lock="true">
    <router-link to="/pokemon" class="lightbox-background"></router-link>
    <div class="lightbox-content">
      <div class="pokemon-details-illustrations">
        <div>
          <div>
            <button :disabled="selectedSprite === 'front_shiny'" @click="selectedSprite = 'front_shiny'">Shiny</button>
            <button :disabled="selectedSprite === 'front_default'" @click="selectedSprite = 'front_default'">Normal</button>
          </div>
          <div class="pokemon-details-image-container">
            <img :alt="pokemon.id" :src="`${pokemon.sprites[selectedSprite]}`" />
          </div>
        </div>
      </div>
      <div class="pokemon-details-infos">
        <h3>{{pokemon.name}}</h3>
        <hr />
        <strong>type(s) :</strong>
        <div v-for="{ type} in pokemon.types" :key="`${pokemon.id}-${type.name}`">
          <span>{{type.name}}</span>
        </div>
        <hr />
        <strong>abilities :</strong>
        <div v-for="{ability} in pokemon.abilities" :key="`${pokemon.id}-${ability.name}`">
          <span>{{ability.name}}</span>
        </div>
        <hr />
        <strong>height : {{pokemon.height}}</strong>
        <hr />
        <strong>weight : {{pokemon.weight}}</strong>
        <hr />
        <strong>stats :</strong>
        <div v-for="{stat, base_stat} in pokemon.stats" :key="`${pokemon.id}-${stat.name}`">
          <span>{{stat.name}} : {{base_stat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

body {
  margin: 0
}

.pokemon-lightbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.lightbox-background {
  background-color: rgba(0, 0, 0, .9);
  display: block;
  height: 100%;
  width: 100%;
}

.lightbox-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: whitesmoke;
  display: flex;
  flex-direction: row;
}

.pokemon-details-image-container {
  width: 380px;
  border: 1px solid rgba(0, 0, 0, .2)
}

img {
  width: 100%;
  height: auto;
  margin: auto;
  display: block;
}
</style>

<script>
export default {
  name: 'PokemonDetails',
  data () {
    return {
      selectedSprite: 'front_default'
    }
  },
  methods: {
    getPokemon () {
      return this.$store.getters.getPokemon(this.$route.params.id)
    }
  },
  computed: {
    pokemon () {
      return this.getPokemon()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
