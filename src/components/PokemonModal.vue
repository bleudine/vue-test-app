<template>
  <v-dialog v-model="dialog" width="600" @click:outside="closeLightbox">
    <v-card>
      <div v-if="dialog" class="modal-content">
        <pokemon-details :id="id"/>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import PokemonDetails from '@/components/PokemonDetails'

export default {
  name: 'Lightbox',
  components: {
    PokemonDetails
  },
  data () {
    return {
      left: 0,
      dialog: Boolean(this.$route.query.pokemon)
    }
  },
  computed: {
    id () {
      return this.$route.query.pokemon
    }
  },
  watch: {
    id (value) {
      this.dialog = Boolean(value)
    }
  },
  methods: {
    closeLightbox () {
      this.$emit('close-lightbox')
    }
  }
}
</script>

<style lang="scss">

body {
  margin: 0
}

.modal-content {
  background-color: #ee1515;
  padding: 32px;
  border-radius: 8px;
}
</style>
