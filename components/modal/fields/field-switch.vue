<template>
  <div class="pointer" @click="setValue">
    <template v-if="isRtlMode">
      <lfx-switch-on-rtl v-if="value" />
      <lfx-switch-off-rtl v-else />
    </template>
    <template v-else>
      <lfx-switch-on v-if="value" />
      <lfx-switch-off v-else />
    </template>
    <div v-if="info && !value" class="d-flex" :style="`position: absolute; left: 0; padding-top: ${error ? 30 : 10}px;`">
      <div :style="isRtlMode ? 'margin-left: 11px;' : 'margin-right: 11px;'">
        <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
      </div>
      <div class="text-dark-primary-14 line-height-1-2">
        <span v-text="$t(info)" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxSwitchOnRtl from '~/components/modal/fields/switch/lfx-switch-on-rtl'
import LfxSwitchOffRtl from '~/components/modal/fields/switch/lfx-switch-off-rtl'
import LfxSwitchOn from '~/components/modal/fields/switch/lfx-switch-on'
import LfxSwitchOff from '~/components/modal/fields/switch/lfx-switch-off'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
export default {
  name: 'FieldSwitch',
  components: {
    LfxIconInfo,
    LfxSwitchOff,
    LfxSwitchOn,
    LfxSwitchOffRtl,
    LfxSwitchOnRtl
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    id: {
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
    info: {
      type: String,
      default: null
    }
  },
  computed: {
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
