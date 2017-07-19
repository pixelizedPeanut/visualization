<template>
<div>
  Hello world
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'consolidatedView',
  created () {
    this.ga()
    this.setRealms()
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'ga',
      'setRealms'
    ])
  }
}
</script>

<style scoped>

</style>
