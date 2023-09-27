<template>
  <div class="modal-select-options">
    <div
      v-for="(item, key) in changedValues"
      :key="key"
      class="modal-select-options-option"
      :class="item.value === value ? '-active' : ''"
      @click="setOption(item.value)"
    >
      <span :class="isRtlMode ? 'ml-1' : 'mr-1'" v-text="item.text" />
      <span style="font-size: 13px; color: #a6abb2;" v-text="item.value" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTransfer',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    values: {
      type: Array,
      default: () => ([{ text: null, value: null }])
    }
  },
  computed: {
    changedValues () {
      return this.values.map(val => ({ text: val.text.split('/')[1], value: val.value }))
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    setOption (value) {
      this.$emit('set-option', value)
    }
  }
}
</script>
