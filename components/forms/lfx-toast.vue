<template>
  <b-toast
    id="lfx-toast"
    :class="`lfx-forms-toast -${dir} -${messageToast.variant}`"
    :title="$t(messageToast.title)"
    :dir="dir"
    static
    no-close-button
    @hidden="hideToast"
  >
    <span class="text-dark-primary-15 toast-body-text" :class="`-${dir}`" v-html="$t(messageToast.description, { label: '' })" />
  </b-toast>
</template>

<script>
export default {
  name: 'LfxToast',
  computed: {
    messageToast () {
      return this.$store.getters['dictionaries/getters/handler/getMessageToast']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    messageToast: {
      handler (newValue) {
        newValue && newValue.shown
          ? this.$bvToast.show('lfx-toast')
          : this.$bvToast.hide('lfx-toast')
      },
      deep: true
    }
  },
  methods: {
    hideToast () {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_TOAST', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: false
      })
    }
  }
}
</script>
<style lang="scss">
  .toast-header {

    button.close {

    }
  }

  .toast-body {
    display: flex !important;

    &-text {
      width: 100%;

      &.-ltr {

      }

      &.-rtl {
        text-align: right;
      }
    }
  }
</style>
