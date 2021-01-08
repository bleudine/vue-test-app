<template>
  <div class="container">
    <div class="pokemon-details-illustrations">
      <div>
        <pokemon :sprite="pokemon.sprites[selectedSprite]" :pokemon="pokemon"/>
        <div class="pokemon-details-image-switch">
          <button :disabled="selectedSprite === 'front_default'" @click="selectedSprite = 'front_default'">Normal
          </button>
          <button :disabled="selectedSprite === 'front_shiny'" @click="selectedSprite = 'front_shiny'">Shiny</button>
        </div>
      </div>
    </div>
    <div class="pokemon-details-container">
      <h3>{{ pokemon.name }}</h3>
      <div class="pokemon-details-infos">
        <strong>type(s) :</strong>
        <div class="pokemon-details-type">
          <div v-for="{type} in pokemon.types" :key="`${pokemon.id}-${type.name}`">
            <img alt="type-icon" :src="`/assets/${type.name === 'fairy' ? 'unknown' : type.name}.png`"/>
          </div>
        </div>
        <strong>abilities :</strong>
        <div class="pokemon-details-abilities">
          <div v-for="{ability} in pokemon.abilities" :key="`${pokemon.id}-${ability.name}`">
            <span>{{ ability.name }}</span>
          </div>
        </div>
        <strong>height : </strong><span>{{ pokemon.height }}</span>
        <strong>weight : </strong><span>{{ pokemon.weight }}</span>
        <strong>stats :</strong>
        <table>
          <tbody class="stats-table" v-for="{stat, base_stat} in pokemon.stats" :key="`${pokemon.id}-${stat.name}`">
          <tr>
            <td>{{ stat.name }}</td>
            <td>{{ base_stat }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  color: #f0f0f0;
}

.pokemon-details-illustrations {
  display: flex;
  flex-direction: column;
  justify-content: center;

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
  background-color: #f0f0f0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .2)
}

.pokemon-details-image-switch {
  display: flex;
  flex-direction: row;
}

.pokemon {
  img {
    height: auto;
    width: initial;
    margin: auto;
    display: block;
  }
}

h3 {
  color: #ffcb55;
}

.pokemon-details-infos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: start;
  background-color: #ffcb55;
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

  td {
    border: 1px solid #ffcb55;
  }

  td:last-child {
    text-align: end;
    border-right: none;
  }
}
</style>

<script>
import Pokemon from '@/components/Pokemon'
import { mapGetters } from 'vuex'

export default {
  name: 'PokemonDetails',
  components: {
    Pokemon
  },
  props: {
    id: String
  },
  data () {
    return {
      selectedSprite: 'front_default'
    }
  },
  computed: {
    ...mapGetters({
      getPokemon: 'getPokemon'
    }),
    pokemon () {
      return this.getPokemon(this.id)
    }
  }
}
</script>
