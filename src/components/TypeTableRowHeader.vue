<template>
  <tr>
    <th>&nbsp;</th>
    <th v-for="{value} in typeHeaders" :key="value">
      <img alt="type-icon" :src="`/assets/${value === 'fairy' ? 'unknown' : value}.png`"/>
    </th>
  </tr>
</template>

<script>
export default {
  name: 'TypeTableRowHeader',
  props: {
    headers: Array
  },
  computed: {
    typeHeaders () {
      return this.headers.filter(header => header.value !== 'name')
    }
  }
}
</script>
