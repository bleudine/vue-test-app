<template>
  <v-dialog v-model="dialog" width="600" @click:outside="closeLightbox">
    <template v-slot:activator="{on, attrs}">
      <div v-on="on" v-bind="attrs">
        <slot name="activator"></slot>
      </div>
    </template>
    <v-card>
      <div class="modal-content">
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
  props: {
    name: String
  },
  data () {
    return {
      left: 0,
      dialog: false
    }
  },
  watch: {
    dialog (value) {
      if (!value) {
        this.closeLightbox()
      }
    }
  },
  mounted () {
    if (this.id === this.name) {
      this.dialog = true
    }
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
