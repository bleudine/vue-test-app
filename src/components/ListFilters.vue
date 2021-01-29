<template>
  <div class="filters">
    {{selectedTypes}}
    <div class="combobox-search-filter">
      <v-combobox
        v-model="tags"
        label="Filter pokemon list by adding some tags"
        multiple small-chips
        :search-input.sync="search"></v-combobox>
    </div>
    <div class="type-filter-list">
      <div v-for="(type, index) in types" :key="`type-${index}`">
        <div @click="updateType(type)" :class="`type-filter ${isSelected(type) ? '--selected' : ''}`">
          <img alt="type-icon" :src="`/assets/${type === 'fairy' ? 'unknown' : type}.png`"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    selectedTypes: Array,
    selectedTags: Array
  },
  data () {
    return {
      search: null,
      tags: this.selectedTags
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
  },
  watch: {
    tags () {
      this.$emit('tag-change', this.tags)
    }
  },
  methods: {
    updateType (type) {
      this.$emit(`${this.isSelected(type) ? 'removed' : 'added'}-type`, type)
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
