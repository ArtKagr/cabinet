<template>
  <div v-if="isCountries" class="modal-select-options" :class="isBubble ? '-bubble' : ''">
    <div v-if="!isSearchHidden" class="p-1">
      <b-form-input v-model="foundCountry" class="field-text" />
    </div>
    <template v-if="valuesCopy.length">
      <div
        v-for="(item, key) in valuesCopy"
        :key="key"
        :class="item.value === value ? '-active' : ''"
        class="modal-select-options-option"
        @click="setOption(item.value)"
      >
        <div v-if="isLangCountries" class="authorization-modal-container-dropdown-items-item-logo -popup">
          <header-languages-logo :current-logo="item.value" />
        </div>
        <lfx-symbol-country v-else :symbol="item.value" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
        <span v-text="item.text" />
      </div>
    </template>
    <span v-else class="modal-select-options-empty" v-text="$t('Ничего не найдено')" />
  </div>
  <div v-else class="modal-select-options">
    <span
      v-for="(item, key) in valuesCopy"
      :key="key"
      class="modal-select-options-option"
      :class="item.value === value ? '-active' : ''"
      @click="setOption(item.value)"
      v-text="item.text"
    />
  </div>
</template>

<script>
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
import HeaderLanguagesLogo from '~/components/header/headerLanguagesLogo'
export default {
  name: 'SelectStandard',
  components: { HeaderLanguagesLogo, LfxSymbolCountry },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    values: {
      type: Array,
      default: () => ([{ text: null, value: null }])
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
    isBubble: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      foundCountry: null,
      valuesCopy: []
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  watch: {
    foundCountry (newValue) {
      this.valuesCopy = this.values

      if (newValue) {
        this.valuesCopy = this.valuesCopy.filter(value => value.text.includes(newValue))
      }
    }
  },
  created () {
    this.valuesCopy = this.values
  },
  methods: {
    setOption (value) {
      this.$emit('set-option', value)
    }
  }
}
</script>
