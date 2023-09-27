<template>
  <div :class="`modal-select bg-white -${id}`">
    <div
      class="modal-select-head -bubble"
      :class="[isOptionsOpened ? '-opened' : '', changedError ? '-error' : '']"
      @click="toggleOptions"
      @keydown.enter="toggleOptions"
    >
      <div class="d-flex align-items-center">
        <lfx-symbol-country v-if="isCountries" :symbol="value" :width="35" :height="35" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
        <span class="modal-select-head-value -bubble" v-text="selectTitle" />
      </div>
      <lfx-icon-chevron-down :class="{ 'rotate_180': isOptionsOpened }" />
    </div>
    <select-standard
      v-if="isOptionsOpened"
      v-model="changedValue"
      :values="values"
      :is-bubble="true"
      :is-countries="isCountries"
      @set-option="setOption"
    />
  </div>
</template>

<script>
import SelectStandard from '~/components/modal/fields/select/select-standard'
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'FieldSelectBubble',
  components: {
    LfxIconChevronDown,
    LfxSymbolCountry,
    SelectStandard
  },
  props: {
    id: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    values: {
      type: Array,
      default: () => ([{ text: null, value: null }])
    },
    error: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    isCountries: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOptionsOpened: false,
      changedError: false,
      changedValue: null,
      selectTitle: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    fieldId () {
      return this.id || this.formTitle
    }
  },
  watch: {
    error (newValue) {
      this.changedError = newValue
    }
  },
  created () {
    this.changedValue = this.value
    this.changedError = this.error
    this.setTitle(this.value)
  },
  methods: {
    setOption (value) {
      this.isOptionsOpened = false
      this.changedValue = value
      this.setTitle(value)
    },
    toggleOptions () {
      this.isOptionsOpened = !this.isOptionsOpened
      this.changedError = this.error && this.isOptionsOpened ? false : !!(this.error && !this.isOptionsOpened)
    },
    setTitle (value) {
      const val = this.values.find(val => val.value === value)
      if (this.fieldId === 'internalTransfer') {
        this.selectTitle = { value: val.text.split('/')[1], text: val.value }
      } else {
        this.selectTitle = val ? val.text : this.values[0].text
      }

      this.$emit('change', val ? val.value : this.values[0].value)
    }
  }
}
</script>
