<template>
  <div class="field-checkbox-radio" @click="setValue">
    <div class="field-checkbox-radio-field">
      <lfx-icon-radio v-if="value === 1" class="field-checkbox-radio-field-icon" :class="isRtlMode ? '-rtl' : '-ltr'" />
      <lfx-icon-radio-fill v-else class="field-checkbox-radio-field-icon" :class="isRtlMode ? '-rtl' : '-ltr'" />
      <span class="field-checkbox-radio-field-text" v-text="$t('Нет')" />
    </div>
    <div class="field-checkbox-radio-field">
      <lfx-icon-radio v-if="value === 0" class="field-checkbox-radio-field-icon" :class="isRtlMode ? '-rtl' : '-ltr'" />
      <lfx-icon-radio-fill v-else class="field-checkbox-radio-field-icon" :class="isRtlMode ? '-rtl' : '-ltr'" />
      <span class="field-checkbox-radio-field-text" v-text="$t('Да')" />
    </div>
  </div>
</template>

<script>
import LfxIconRadio from '~/components/icons/lfx-icon-radio'
import LfxIconRadioFill from '~/components/icons/lfx-icon-radio-fill'
export default {
  name: 'FieldCheckboxRadio',
  components: { LfxIconRadioFill, LfxIconRadio },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  created () {
    this.$emit('change', this.value)
  },
  methods: {
    setValue () {
      this.$emit('change', this.value === 1 ? 0 : 1)
    }
  }
}
</script>
<style lang="scss">
  .field-checkbox-radio {
    display: flex;
    flex-direction: column;

    &-field {

      &:nth-child(1) {
        margin-top: 5px;
        margin-bottom: 10px;
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
        font-size: 12px;
        color: #6d788a;
      }
    }
  }
</style>
