<template>
  <div class="field-select-radio">
    <div v-for="(item, key) in values" :key="key" class="field-select-radio-item" @click="setValue(item.value)">
      <div class="field-select-radio-item-icon" :class="isRtlMode ? '-rtl' : '-ltr'">
        <lfx-icon-radio-error v-if="error" />
        <lfx-icon-radio-fill v-else-if="item.value === value" />
        <lfx-icon-radio v-else />
      </div>
      <span class="field-select-radio-item-text" v-text="item.text" />
    </div>
  </div>
</template>

<script>
import LfxIconRadioFill from '~/components/icons/lfx-icon-radio-fill'
import LfxIconRadio from '~/components/icons/lfx-icon-radio'
import LfxIconRadioError from '~/components/icons/lfx-icon-radio-error'
export default {
  name: 'FieldSelectRadio',
  components: { LfxIconRadioError, LfxIconRadio, LfxIconRadioFill },
  props: {
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
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    setValue (value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">
  .field-select-radio {

    &-item {
      display: flex;
      padding-top: 10px;
      cursor: pointer;

      &:nth-child(1) {
        padding-top: 5px;
      }

      &-icon {

        &.-ltr {
          margin-right: 10px;
        }

        &.-rtl {
          margin-left: 10px;
        }
      }

      &-text {

      }
    }
  }
</style>
