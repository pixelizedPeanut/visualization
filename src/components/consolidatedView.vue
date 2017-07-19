<template>
<div id="hc">
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
        .then(res => this.setPercentiles(res))
        .then(res => this.render(res))
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
      'render'
    ])
  }
}
</script>

<style scoped>

</style>
