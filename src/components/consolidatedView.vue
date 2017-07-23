<template>
  <div>
    <div id="hc">
    </div>
    <div id="hc2">
    </div>
    <div id="hc3">
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'C-RUM',
  created () {
    this.ga()
  },
  props: ['date'],
  mounted () {
    this.setRealms().then(() => {
      this.setMetrics(this.date)
      this.setPercentiles(this.date)
    }).then(() => {
      this.renderRevenue()
      this.renderConversion()
      this.renderLsp()
    })
  },
  data () {
    return {}
  },
  watch: {
    date () {
      this.setPercentiles(this.date).then(() => this.renderLsp())
      this.setMetrics(this.date).then(() => {
        this.renderConversion()
        this.renderRevenue()
      })
    }
  },
  getters: {
    ...mapGetters(['realms'])
  },
  methods: {
    ...mapActions([
      'ga',
      'setRealms',
      'setPercentiles',
      'setMetrics',
      'render'
    ]),
    renderLsp () {
      this.render({
        id: 'hc',
        store: 'percentiles',
        title: 'Page load time',
        label: 's'
      })
    },
    renderConversion () {
      this.render({
        id: 'hc3',
        store: 'conversion',
        title: 'Conversion',
        label: ''
      })
    },
    renderRevenue () {
      this.render({
        id: 'hc2',
        store: 'revenue',
        title: 'Revenue',
        label: 'k'
      })
    }
  }
}
</script>

<style scoped>

</style>
