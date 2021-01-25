<template>
  <div class="filters">
    <div class="combobox-search-filter">
      <v-combobox v-model="tags" label="Filter pokemon list by adding some tags" multiple small-chips
                  :search-input.sync="search"></v-combobox>
    </div>
    <div class="type-filter-list">
      <div v-for="(type, index) in types" :key="`type-${index}`">
        <div @click="addFilter(type)" :class="`type-filter ${isSelected(type) ? '--selected' : ''}`">
          <img alt="type-icon" :src="`/assets/${type === 'fairy' ? 'unknown' : type}.png`"/>
        </div>
      </div>
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
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
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
  }
}
</script>

<style lang="scss">

.filters {
  background-color: #003a70;
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.combobox-search-filter {
  padding-top: 12px;
  max-width: 720px;
  flex-grow: 1;
  width: 100%;
  label {
    color: #fefefe !important;
    font-size: 12px;
  }
}

.type-filter-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .type-filter {
    margin: 2px;
    width: 48px;
    padding: 1px;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      margin: auto;
      filter: opacity(.5);
    }

    &.--selected {
      img {
        filter: none;
      }
    }
  }
}
</style>
