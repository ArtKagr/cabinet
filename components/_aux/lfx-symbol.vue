<template>
  <div class="d-flex" :style="`width: ${small && length === 1 ? 25 : large && length === 1 ? 40 : large ? 80 : 50}px; height: ${size}px;`">
    <div v-for="(icon, key) in symbolIcon" :key="key">
      <i>
        <svg display="none" v-html="icon" />
        <svg :width="size" :height="size"><use :xlink:href="`#i-${key.toLowerCase()}`" /></svg>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LfxSymbol',
  props: {
    symbol: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    symbolIcon () {
      return this.$store.getters['trading/getters/handler/getSymbols'][this.symbol]
    },
    length () {
      return this.symbolIcon ? Object.keys(this.symbolIcon).length : 0
    },
    size () {
      if (this.large) {
        return 40
      } else if (this.small) {
        return 25
      } else {
        return this.symbolIcon ? this.length === 1 ? 50 : 25 : 0
      }
    }
  }
}
</script>
