<template>
  <div class="d-flex pointer position-relative" :style="height ? `height: ${height}px` : ''" @click="setValue">
    <div class="checkbox" :style="`width: ${size}px; height: ${size}px;`" :class="[`-${dir}`, formId]">
      <lfx-icon-checkbox-error v-if="error" :style="`width: ${size}px; height: ${size}px;`" />
      <lfx-icon-checkbox-fill v-else-if="value" :style="`width: ${size}px; height: ${size}px;`" />
      <lfx-icon-checkbox v-else :style="`width: ${size}px; height: ${size}px;`" />
    </div>
    <span class="field-checkbox-hint" :class="[formId, hintSize ? `-${hintSize}` : '']" v-html="label" />
    <div v-if="info && !value" class="d-flex" :style="`position: absolute; left: 0; ${height ? 'top: 30px' : ''}`">
      <div :style="isRtlMode ? 'margin-left: 11px;' : 'margin-right: 11px;'">
        <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
      </div>
      <div class="field-checkbox-info" :class="formId">
        <span v-text="$t(info)" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckboxError from '~/components/icons/lfx-icon-checkbox-error'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
export default {
  name: 'FieldCheckbox',
  components: { LfxIconInfo, LfxIconCheckboxError, LfxIconCheckboxFill, LfxIconCheckbox },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    id: {
      type: String,
      default: null
    },
    formId: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    info: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: null
    },
    hintSize: {
      type: String,
      default: null
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    setValue () {
      this.$emit('change', this.value === 1 ? 0 : 1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .field-checkbox-hint {
    color: #8e9aac;
    font-size: 14px;

    &.-small {
      font-size: 12px;
    }

    &.notifications {
      color: #6d788a;
      font-size: 12px;
    }
  }

  .field-checkbox-info {
    color: #3B4B68;
    font-size: 14px;
  }

  .checkbox {

    &.notifications {

      &.-ltr {
        margin-right: 10px;
      }

      &.-rtl {
        margin-left: 10px;
      }
    }

    &.-ltr {
      margin-right: 20px;
    }

    &.-rtl {
      margin-left: 20px;
    }
  }

  .text {
    font-size: 14px;
  }
</style>
