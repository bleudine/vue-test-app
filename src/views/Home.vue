<template>
  <div class="home">
    <header class="home-header">
      <div class="team" v-if="team.length > 0">
        <div class="pokemon-team" v-for="(pokemon, index) in team" :key="`team-${index}`">
          <pokemon-lightbox :name="pokemon.name" @close-lightbox="closeLightbox">
            <template v-slot:activator>
              <pokemon :pokemon="pokemon" :sprite="pokemon.sprites['front_default']">
                <template v-slot:header>
                  <v-btn class="remove-button" @click.stop="removeFromTeam(index)">x</v-btn>
                </template>
              </pokemon>
            </template>
          </pokemon-lightbox>
        </div>
        <v-dialog width="250" v-model="saveTeamDialogBox">
          <template v-slot:activator="{on, attrs}">
            <v-btn v-on="on" v-bind="attrs">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <v-card>
            <div class="save-team-dialog">
              <v-text-field v-model="title" :append-outer-icon="'mdi-send'" label="Team name"
                            @click:append-outer="saveTeam"></v-text-field>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <list-filters v-on:filter-change="filterPokemons"></list-filters>
    </header>
    <div class="pokemon-list">
      <div class="pokemon-container" v-for="poke in pokemons" :key="poke.id">
        <pokemon-lightbox :name="poke.name" @close-lightbox="closeLightbox">
          <template v-slot:activator>
            <pokemon :pokemon="poke" :sprite="poke.sprites['front_default']">
              <template v-slot:header>
                <span class="pokemon-name">{{ poke.name }}</span>
              </template>
              <template v-slot:footer>
                <v-btn @click.stop="addToTeam(poke)">Add to team</v-btn>
              </template>
            </pokemon>
          </template>
        </pokemon-lightbox>
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue'
import PokemonLightbox from '@/components/PokemonModal'
import ListFilters from '@/components/ListFilters'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Pokemon,
    PokemonLightbox,
    ListFilters
  },
  data () {
    return {
      saveTeamDialogBox: false,
      title: '',
      pokemons: []
    }
  },
  computed: {
    ...mapGetters({
      team: 'getTeam',
      getPokemons: 'getPokemonList'
    })
  },
  methods: {
    addToTeam (pokemon) {
      this.$store.dispatch('addToTeam', { pokemon })
    },
    removeFromTeam (index) {
      this.$store.dispatch('removeFromTeam', { index })
    },
    closeLightbox () {
      this.$router.push({ name: 'Home', query: null })
    },
    saveTeam () {
      this.$store.dispatch('saveTeam', { title: this.title })
      this.title = ''
      this.saveTeamDialogBox = false
    },
    filterPokemons ({ tags, selectedTypes }) {
      function pokemonTypesAndName ({ types, name }) {
        return types.reduce((acc, { type }) => `${acc} ${type.name}`, name)
      }

      const loweredTags = tags.map(s => s.toLowerCase())
      this.pokemons = Object.values(this.getPokemons).filter((pokemon) => loweredTags.length ? loweredTags.every(tag => pokemonTypesAndName(pokemon).includes(tag)) : selectedTypes.some(type => pokemonTypesAndName(pokemon).includes(type)))
    }
  }
}
</script>

<style lang="scss">
.home-header {
  position: sticky;
  top: 0;
  z-index: 11;
  box-shadow: 0 2px 2px 0 rgba(44, 62, 80, .2);
}

.team {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  background-color: #ee1515;

  .pokemon-team {
    margin: 12px;
    border-radius: 4px;
    background: #f0f0f0;
    box-shadow: 0 2px 2px 0 rgba(44, 62, 80, .2);
    position: relative;

    .remove-button {
      position: absolute;
      padding: 4px;
      min-width: initial;
      height: auto;
      font-size: 12px;
      top: -5px;
      right: -5px;
      border: none;
      border-radius: 50%;
    }
  }
}

.pokemon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50em;
  margin: auto;
}

.pokemon-container {
  margin: 8px;
}

.pokemon-name {
  text-transform: capitalize;
}

.save-team-dialog {
  padding: 20px;
}
</style>
