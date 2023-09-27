<template>
  <div class="d-flex flex-column" style="width: 50px; height: 50px;">
    <div
      v-for="(icon, key) in symbolIcon"
      :key="key"
      :style="length === 2 ? 'height: 25px;' : 'height: 50px;'"
    >
      <i :style="keys[key] === 0 && isRtlMode ? 'margin-left: 12px;' : keys[key] === 1 && !isRtlMode ? 'margin-left: 12px;' : ''">
        <svg display="none" v-html="icon" />
        <svg :width="length === 2 ? 38 : 50" :height="length === 2 ? 38 : 50"><use :xlink:href="`#i-${key.toLowerCase()}`" /></svg>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LfxSymbolTradingCard',
  props: {
    symbol: {
      type: String,
      default: null
    }
  },
  computed: {
    symbolIcon () {
      return this.$store.getters['trading/getters/handler/getSymbols'][this.symbol]
    },
    length () {
      return this.symbolIcon ? Object.keys(this.symbolIcon).length : 0
    },
    keys () {
      return this.symbolIcon
        ? Object.keys(this.symbolIcon).reduce((acc, symbol, index) => {
          acc[symbol] = index
          return acc
        }, {})
        : {}
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  }
}
</script>
