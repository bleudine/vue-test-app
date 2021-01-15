<template>
  <div class="nav-filters">
    <div class="type-filter-list">
      <div v-for="(type, index) in types" :key="`type-${index}`">
        <div @click="addFilter(type)" :class="`type-filter ${isSelected(type) ? '--selected' : ''}`">
          <img alt="type-icon" :src="`/assets/${type === 'fairy' ? 'unknown' : type}.png`"/>
        </div>
      </div>
    </div>
    <div class="combobox-search-filter">
      <v-combobox v-model="tags" label="Filter pokemon list by adding some tags" multiple small-chips
                  :search-input.sync="search"></v-combobox>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedTypes: [],
      tags: [],
      search: null
    }
  },
  watch: {
    selectedTypes () {
      this.$emit('filter-change', { tags: this.tags, selectedTypes: this.selectedTypes })
    },
    tags () {
      this.$emit('filter-change', { tags: this.tags, selectedTypes: this.selectedTypes })
    },
    types () {
      this.selectedTypes = Array.from(this.types)
    }
  },
  methods: {
    addFilter (type) {
      if (this.isSelected(type)) {
        this.selectedTypes.splice(this.selectedTypes.indexOf(type), 1)
      } else {
        this.selectedTypes.push(type)
      }
    },
    isSelected (type) {
      return this.selectedTypes.includes(type)
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
  }
}
</script>

<style lang="scss">
.combobox-search-filter {
  label {
    color: #fefefe !important;
    font-size: 12px;
  }
}
</style>
