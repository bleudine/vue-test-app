<template>
  <div id="app">
    <div id="nav" ref="nav">
      <div class="nav-link-container">
        <router-link to="/pokemon">Home</router-link>
        |
        <router-link to="/team">My team</router-link>
      </div>
      <div class="type-filter-list">
        <div v-for="(type, index) in types" :key="`type-${index}`">
          <div @click="addFilter(type)" :class="`type-filter ${isSelected(type) ? '--selected' : ''}`">
            <img alt="type-icon" :src="`/assets/${type === 'fairy' ? 'unknown' : type}.png`" />
          </div>
        </div>

      </div>
    </div>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
}

#nav {
  padding: 30px;
  background-color: #003a70;
  min-width: 20vw;

  .nav-link-container {

    a {
      font-weight: bold;
      color: #3d7dca;

      &.router-link-exact-active {
        color: #f0f0f0;
        text-decoration: none;
      }
    }
  }

  .type-filter-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 18em;
    margin: 32px 0;

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
}

.wrapper {
  flex-grow: 1;
  height: 100vh;
  overflow-y: scroll;
  background-color: #ffcb55;
  position: relative;
}

.my-team {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: #2c3e50;
  border: 1px solid
}

* > * {
  box-sizing: border-box;
}
</style>

<script>
import { mapGetters } from 'vuex'

// TODO switch style and scripts tags EVERYWHERE
// TODO install vuetify
// TODO rework lightbox with vuetify (remove $parent.$parent shenanigans)
// TODO use all buttons and inputs with vuetify
// TODO use mapGetters and/or mapState

// TODO OPTIONAL : think of a way to filter with types without using vuex store (maybe pass nav in Home component)

// teams
// TODO only 6 pokemon per team
// TODO remove oldest pokemon if limit is reached
// TODO save a team and load a team

// TODO Home search bar to filter list with combo box by vuetify and match ALL tags
// TODO search pokemon name and pokemon type

// TODO use translation (french version alongside engrish version) with vue-i18n

// TODO add new routes with pokemon table type (see https://www.pokebip.com/page/jeuxvideo/table-des-types)
// TODO to achieve this use data table

// TODO use API instead of local resources ffs

// single view pokemon
// TODO display weakness table
// TODO display pokemon evolutions

export default {
  created () {
    this.$store.dispatch('loadResources')
  },
  methods: {
    addFilter (type) {
      this.$store.dispatch('setSelectedType', { type })
    },
    isSelected (type) {
      return this.selectedTypes.includes(type)
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes',
      selectedTypes: 'getSelectedTypes'
    })
  }
}
</script>
