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
  name: 'consolidatedView',
  created () {
    this.ga()
  },
  mounted () {
    this.setRealms()
        .then(res => {
          this.setPercentiles(res)
          return this.setMetrics(res)
        })
        .then(res => {
          this.render(res)
          this.renderRevenue(res)
        })
  },
  data () {
    return {}
  },
  getters: {
    ...mapGetters(['realms', 'percentiles'])
  },
  methods: {
    ...mapActions([
      'ga',
      'setRealms',
      'setPercentiles',
      'setMetrics',
      'render',
      'renderRevenue'
    ])
  }
}
</script>

<style scoped>

</style>
