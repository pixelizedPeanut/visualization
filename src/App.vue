<template>
  <div id="app">
    <div class="nav">
      <img src="./assets/logo.gif" />
      <div>
        <input type="date" v-model="dateStart"/>
        <input type="date" v-model="dateEnd"/>
        <button type="button" name="button" @click="apply()">Apply</button>
      </div>
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
      dateStart: new Date(new Date().getTime() - 3 * 24 * 3600 * 1000).toISOString('').match(/(.+)T/)[1],
      dateEnd: new Date().toISOString('').match(/(.+)T/)[1]
    }
  },
  methods: {
    ...mapActions([
      'ga',
      'updateDate',
      'setRealms',
      'setPercentiles',
      'setMetrics',
      'render',
      'renderRevenue'
    ]),
    apply () {
      // this.updateDate(this.dateStart, this.dateEnd)
      // this.setPercentiles(this.dateStart, this.dateEnd).then(() => this.render())
      // this.setMetrics(this.dateStart, this.dateEnd).then(() => this.renderRevenue())
    }
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
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
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
