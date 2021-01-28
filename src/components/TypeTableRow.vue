<template>
  <tr>
    <td class="type-container" @click="expandRow">
      <span class="type-img-container" v-for="name in typeNames" :key="name">
        <img alt="type-icon" :src="`/assets/${name === 'fairy' ? 'unknown' : name}.png`"/>
      </span>
    </td>
    <td :class="`damage${damageModifierClassName(value)}`"
        v-for="[key, value] in Object.entries(item).filter(([k]) => k !== 'name')" :key="`${item.name}-${key}`">
      {{ stringifyDamageRelationValue(value) }}
    </td>
  </tr>
</template>

<script>

export default {
  name: 'TypeTableRow',
  props: {
    item: Object
  },
  computed: {
    typeNames () {
      return this.item.name.split(' ')
    }
  },
  methods: {
    stringifyDamageRelationValue (value) {
      switch (value) {
        case 0.5:
          return '½'
        case 0.25:
          return '¼'
        default:
          return value.toString()
      }
    },
    damageModifierClassName (value) {
      switch (value) {
        case 4:
          return '--four'
        case 2:
          return '--double'
        case 1:
          return '--normal'
        case 0.5:
          return '--half'
        case 0.25:
          return '--quart'
        case 0:
          return '--none'
        default:
          return ''
      }
    },
    expandRow () {
      this.$emit('expand-row')
    }
  }
}
</script>

<style lang="scss">
.type-img-container {
  display: block;
  width: 32px;
}

.damage {
  &--none {
    background-color: #AAAAAA;
  }

  &--half {
    background-color: #AAFFAA;
  }

  &--quart {
    background-color: #44FF44;
  }

  &--normal {
    background-color: #EAEFF5;
  }

  &--double {
    background-color: #FFAAAA;
  }

  &--four {
    background-color: #FF4444;
  }
}

</style>
