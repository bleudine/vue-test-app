<template>
  <v-data-table
    show-expand
    hide-default-footer
    dense
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :items-per-page="tableHeaders.length"
    :headers="tableHeaders"
    loading
    item-key="name"
    :items="typeTable" class="elevation-1">
    <template v-slot:expanded-item="{headers, item }">
      <td class="nested-table" :colspan="headers.length + 1">
        <v-data-table
          dense
          :items-per-page="tableHeaders.length"
          hide-default-footer :headers="tableHeaders"
          :items="doubleTypeTable(item.name)"></v-data-table>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Types',
  data () {
    return {
      loading: true,
      singleExpand: true,
      expanded: []
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes',
      typeTable: 'getTypeTable'
    }),
    tableHeaders () {
      return [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        ...this.types.map((type) => ({
          text: type,
          align: 'start',
          sortable: false,
          value: type
        }))
      ]
    }
  },
  watch: {
    typeTable () {
      this.loading = false
    }
  },
  methods: {
    doubleTypeTable (doubledType) {
      const typeIndex = this.types.indexOf(doubledType)
      const newArray = Array.from(this.typeTable)
      newArray.splice(typeIndex, 1)
      return newArray.map((types) => Object.entries(types).reduce((acc, [key, value]) => {
        if (key === 'name') {
          return {
            ...acc,
            name: `${doubledType} ${value}`
          }
        }
        return {
          ...acc,
          [key]: value * this.typeTable[typeIndex][key]
        }
      }, {}))
    }
  }
}
</script>

<style lang="scss">

.nested-table {
  padding: 0 !important;
}

</style>
