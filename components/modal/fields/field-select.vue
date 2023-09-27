<template>
  <div :class="`modal-select bg-white -${id}`">
    <div
      class="modal-select-head"
      :class="[isOptionsOpened ? '-opened' : '', changedError ? '-error' : '']"
      :style="selectStyles"
      @click="toggleOptions"
      @keydown.enter="toggleOptions"
    >
      <div v-if="isCountries" class="d-flex align-items-center">
        <div v-if="isLangCountries" class="authorization-modal-container-dropdown-items-item-logo -popup">
          <header-languages-logo :current-logo="value" />
        </div>
        <lfx-symbol-country v-else-if="value" :symbol="value" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
        <span class="modal-select-head-value" v-text="selectTitle" />
      </div>
      <div v-else-if="fieldId === 'internalTransfer'" class="modal-select-head-value-transfer">
        <span class="modal-select-head-value-transfer-value" :class="`-${dir}`" v-text="selectTitle.value" />
        <span v-text="selectTitle.text" />
      </div>
      <span v-else class="modal-select-head-value" v-text="selectTitle" />
      <lfx-icon-chevron-down :class="{ 'rotate_180': isOptionsOpened }" />
    </div>
    <template v-if="isOptionsOpened">
      <select-transfer v-if="fieldId === 'internalTransfer'" v-model="changedValue" :values="values" @set-option="setOption" />
      <select-standard
        v-else
        v-model="changedValue"
        :values="values"
        :is-countries="isCountries"
        :is-search-hidden="isSearchHidden"
        :is-lang-countries="isLangCountries"
        @set-option="setOption"
      />
    </template>
  </div>
</template>

<script>
import SelectStandard from '~/components/modal/fields/select/select-standard'
import SelectTransfer from '~/components/modal/fields/select/select-transfer'
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
import HeaderLanguagesLogo from '~/components/header/headerLanguagesLogo'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'FieldSelect',
  components: {
    LfxIconChevronDown,
    HeaderLanguagesLogo,
    LfxSymbolCountry,
    SelectTransfer,
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
    isCountries: {
      type: Boolean,
      default: false
    },
    isSearchHidden: {
      type: Boolean,
      default: false
    },
    isLangCountries: {
      type: Boolean,
      default: false
    },
    selectStyles: {
      type: Object,
      default: () => ({})
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
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    fieldId () {
      return this.id || this.formTitle
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
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
      const val = this.values ?? this.values.length ? this.values.find(val => val.value === value) : { text: null, value: null }
      if (this.fieldId === 'internalTransfer') {
        this.selectTitle = { value: val.text.split('/')[1], text: val.value }
      } else if (val && val.text) {
        this.selectTitle = val.text
      } else if (this.values && this.values.length) {
        this.selectTitle = this.values[0].text
      }

      if (val && val.value) {
        this.$emit('change', val.value)
      } else if (this.values && this.values.length) {
        this.$emit('change', this.values[0].value)
      }
    }
  }
}
</script>
