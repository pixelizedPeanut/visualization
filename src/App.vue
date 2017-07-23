<template>
  <div id="app">
    <div class="nav">
      <img src="./assets/logo.gif" />
      <div>
        <input type="date" v-model="dateStart"/>
        <input type="date" v-model="dateEnd"/>
        <button v-if="pages().apply" type="button" name="button" @click="apply()">
          Apply
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  created () {
    this.ga()
  },
  data () {
    return {
      dateStart: this.pages().dateStart,
      dateEnd: this.pages().dateEnd
    }
  },
  methods: {
    ...mapActions([
      'ga',
      'resetStore',
      'setPageProp'
    ]),
    ...mapGetters(['pages']),
    dateFormatter (date) {
      date = date < this.last30Days ? this.last30Days : date
      return parseInt(date / 1000, 10)
    },
    apply () {
      this.resetStore()
      this.setPageProp(['apply', false])
      const start = this.dateFormatter(new Date(this.dateStart).getTime())
      const end = this.dateFormatter(new Date(this.dateEnd).getTime())
      this.$router.push({
        name: 'C-RUM',
        params: {
          date: `${start}_${end}`
        }
      })
    }
  },
  computed: {
    last30Days () {
      return new Date().getTime() - 30 * 24 * 3600 * 1000
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

a {
  text-decoration: none;
  color: black;
}
</style>
