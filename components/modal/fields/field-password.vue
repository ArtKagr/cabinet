<template>
  <b-input-group class="d-flex align-items-center" :style="`height: 41px; border: 1px solid ${error ? '#FF4B5F' : '#D9DCE1'}; border-radius: 3px;`">
    <b-form-input :id="id" v-model="changedValue" :type="type" :style="`border: none; padding: ${isRtlMode ? '9px 10px 9px 0' : '9px 0 9px 10px;'}`" />
    <b-input-group-append :style="isRtlMode ? 'padding-left: 9px;' : 'padding-right: 9px;'">
      <lfx-icon-eye class="eye" @mousedown.native="setType('text')" @mouseup.native="setType('password')" />
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import LfxIconEye from '~/components/icons/lfx-icon-eye'
export default {
  name: 'FieldPassword',
  components: { LfxIconEye },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    id: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      type: 'password'
    }
  },
  computed: {
    changedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    setType (value) {
      this.type = value
    }
  }
}
</script>
<style lang="scss">
  .eye {
    cursor: pointer;
    &:hover {
      #icon_view {
        use {
          fill: #3498db;
        }
      }
    }
  }
</style>
