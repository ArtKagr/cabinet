<template>
  <i>
    <svg display="none" v-html="icon" />
    <svg :width="width" :height="height"><use :xlink:href="`#i-${this.symbol.toLowerCase()}`" /></svg>
  </i>
</template>

<script>
export default {
  name: 'LfxSymbolCountry',
  props: {
    symbol: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 25
    },
    height: {
      type: Number,
      default: 25
    }
  },
  computed: {
    icon () {
      return this.$store.getters['symbols/getters/handler/countries'][this.symbol.toLowerCase()]
    }
  }
}
</script>
