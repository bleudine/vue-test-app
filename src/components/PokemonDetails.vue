<template>
  <div v-on:scroll.prevent="" class="pokemon-lightbox" :style="{left: left}">
    <router-link to="/pokemon" class="lightbox-background"></router-link>
    <div class="lightbox-content">
      <div class="pokemon-details-illustrations">
        <div>
          <div class="pokemon-details-image-container">
            <img class="pokemon-sprite" :alt="pokemon.id" :src="`${pokemon.sprites[selectedSprite]}`" />
          </div>
          <div>
            <button :disabled="selectedSprite === 'front_shiny'" @click="selectedSprite = 'front_shiny'">Shiny</button>
            <button :disabled="selectedSprite === 'front_default'" @click="selectedSprite = 'front_default'">Normal</button>
          </div>
        </div>
      </div>
      <div class="pokemon-details-container">
        <h3>{{pokemon.name}}</h3>
       <div class="pokemon-details-infos">
         <strong>type(s) :</strong>
        <div class="pokemon-details-type">
          <div v-for="{ type} in pokemon.types" :key="`${pokemon.id}-${type.name}`">
            <img alt="type-icon" :src="`/assets/${type.name}.png`" />
          </div>
        </div>
         <strong>abilities :</strong>
        <div class="pokemon-details-abilities">
          <div v-for="{ability} in pokemon.abilities" :key="`${pokemon.id}-${ability.name}`">
            <span>{{ability.name}}</span>
          </div>
        </div>
         <strong>height : </strong><span>{{pokemon.height}}</span>
         <strong>weight : </strong><span>{{pokemon.weight}}</span>
         <strong>stats :</strong>
         <table>
           <tbody class="stats-table" v-for="{stat, base_stat} in pokemon.stats" :key="`${pokemon.id}-${stat.name}`">
           <tr>
             <td>{{stat.name}}</td>
             <td>{{base_stat}}</td>
           </tr>
           </tbody>
         </table>
       </div>
      </div>
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
}

.lightbox-background {
  background-color: rgba(0, 0, 0, .9);
  display: block;
  height: 100%;
  width: 100%;
}

.lightbox-content {
  position: absolute;
  display: flex;
  flex-direction: row;
  background-color: #ee1515;
  text-transform: capitalize;
  color: #f0f0f0;
  min-width: 380px;
  padding: 32px;
}

.pokemon-details-illustrations {
  button {
    background-color: #ee1515;
    color: #ffcb55;
    margin: 8px;
    cursor: pointer;

    &:disabled {
      color: #f0f0f0;
      cursor: initial;
    }
  }
}

.pokemon-details-image-container {
  width: 320px;
  background-color: #f0f0f0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .2)
}

img {
  width: 100%;
  height: auto;
  margin: auto;
  display: block;
}

h3 {
  color: #ffcb55;
}

.pokemon-details-infos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: start;
  background-color:#ffcb55;
  grid-gap: 2px;
  padding: 2px;
  margin-left: 32px;

  strong {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffcb55;
  }

  *, * > * {
    background-color: #ee1515;
  }

  .pokemon-details-type {
    display: flex;
    div {
      margin: 4px;
    }
  }
}

table {
  border-collapse: collapse;
  text-align: start;

  td:last-child {
    text-align: end;
  }
}
</style>

<script>
export default {
  name: 'PokemonDetails',
  data () {
    return {
      selectedSprite: 'front_default',
      left: 0
    }
  },
  mounted () {
    this.left = `${this.$parent.$parent.$refs.nav.offsetWidth}px`
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
