<template>
  <lfx-icon-switch-on v-if="switchState" @click.native="clickHandler(false)" />
  <lfx-icon-switch-off v-else @click.native="clickHandler(true)" />
</template>

<script>
import LfxIconSwitchOff from '~/components/icons/lfx-icon-switch-off'
import LfxIconSwitchOn from '~/components/icons/lfx-icon-switch-on'
export default {
  name: 'LfxSwitch',
  components: { LfxIconSwitchOn, LfxIconSwitchOff },
  props: {
    switchState: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler (flag) {
      this.$emit('click-handler', flag)
    }
  }
}
</script>
