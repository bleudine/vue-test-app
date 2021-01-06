<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/team">My team</router-link> |
      <router-link to="/types">Types: normal</router-link>
    </div>
    <div class="wrapper">
      <router-view/>
    </div>
    <div class="my-team">
      <team />
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
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.wrapper {
  margin-bottom: 50px;
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
import Team from './views/Team'
export default {
  components: {
    Team
  },
  created () {
    this.$store.dispatch('loadResources')
  }
}
</script>
