<template>
  <v-data-table
    hide-default-footer
    dense
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :items-per-page="tableHeaders.length"
    :headers="tableHeaders"
    hide-default-header
    item-key="name"
    :items="typeTable">
    <template v-slot:header="{props: {headers}}">
      <type-table-row-header :headers="headers"/>
    </template>
    <template v-slot:item="{item, expand}">
      <type-table-row @expand-row="expand" :item="item"/>
    </template>
    <template v-slot:expanded-item="{headers, item }">
      <tr>
        <td class="nested-table" :colspan="headers.length">
          <v-data-table
            dense
            :items-per-page="tableHeaders.length"
            hide-default-header
            hide-default-footer :headers="tableHeaders"
            :items="doubleTypeTable(item.name)">
            <template v-slot:header="{props: {headers}}">
              <type-table-row-header :headers="headers"/>
            </template>
            <template v-slot:item="{ item }">
              <type-table-row :item="item"/>
            </template>
          </v-data-table>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import TypeTableRow from '@/components/TypeTableRow'
import TypeTableRowHeader from '@/components/TypeTableRowHeader'

export default {
  name: 'Types',
  components: {
    TypeTableRow,
    TypeTableRowHeader
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      await vm.$store.dispatch('loadTypeTable')
    })
  },
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

table, td, th {
  text-align: center !important;
}
</style>
