<template>
  <div class="field-select-checkbox">
    <div v-for="(item, key) in values" :key="key" class="field-select-checkbox-item" @click="setValue(item.value)">
      <div>
        <lfx-icon-checkbox-error v-if="error" class="field-select-checkbox-item-icon" />
        <lfx-icon-checkbox-fill v-else-if="value && value.length && value.includes(item.value)" class="field-select-checkbox-item-icon" />
        <lfx-icon-checkbox-fill v-else-if="value === item.value" class="field-select-checkbox-item-icon" />
        <lfx-icon-checkbox v-else class="field-select-checkbox-item-icon" />
      </div>
      <span class="field-select-checkbox-item-text" :class="isRtlMode ? '-rtl' : '-ltr'" v-text="item.text" />
    </div>
  </div>
</template>

<script>
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconCheckboxError from '~/components/icons/lfx-icon-checkbox-error'
export default {
  name: 'FieldSelectCheckbox',
  components: { LfxIconCheckboxError, LfxIconCheckbox, LfxIconCheckboxFill },
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
  .field-select-checkbox {
    display: flex;
    flex-direction: column;

    &-item {
      display: flex;
      padding-top: 10px;

      &:nth-child(1) {
        padding-top: 5px;
      }

      &-icon {
        width: 20px;
        height: 20px;
      }

      &-text {
        font-size: 12px;
        color: #6d788a;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }
      }
    }
  }
</style>
