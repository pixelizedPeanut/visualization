<template>
  <div id="app">
    <div class="nav">
      <img src="./assets/logo.gif" />
      <div v-for="route in routes">RUM - {{ route }}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  created () {
    this.ga()
  },
  data () {
    return {
      routes: [
        'consolidated'
      ]
    }
  },
  methods: {
    swap (link) {
      this.$router.push(link)
    },
    ...mapActions([
      'ga'
    ])
  }
}
</script>

<style>
html, body { margin: 0; padding: 0; border: 0; outline: 0; }
body { line-height: 1.2em; }

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 0.8px;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 3rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  border-bottom: 2px solid black;
}

.nav div {
  padding: 1rem;
  height: 2rem;
  border-right: 2px solid black;
}

.action {
  cursor: pointer;
  letter-spacing: 5px;
}

.action:hover {
  padding-left: 5px;
  letter-spacing: 10px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
