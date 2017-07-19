<template>
  <div id="app">
    <div class="nav">
      <div v-for="route in routes" @click="swap(route)">{{ route }}</div>
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
}

.nav div {
  margin: 1rem;
  height: 2rem;
}

router-view {
  margin-top: 4rem;
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
  color:#000;
}

h1, h2, h3, h4, h5, h6 {
  font-family: sans-serif;
}

h1 {
  font-size:30px;
  font-weight: 100;
  line-height: 50px;
}

h4 {
  font-size: 16px;
  font-weight: 300;
}

h5 {
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
}
</style>
