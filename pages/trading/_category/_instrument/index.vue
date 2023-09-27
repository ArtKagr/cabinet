<template>
  <instrument :source="routePages.third ? 'tab' : 'instrument'" />
</template>

<script>
import Instrument from '~/components/trading/instrument/instrument.vue'
export default {
  name: 'CurrentInstrument',
  components: { Instrument },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  }
}
</script>
