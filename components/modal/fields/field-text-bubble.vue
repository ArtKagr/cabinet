<template>
  <div class="lfx-forms-input_bubble">
    <b-form-input
      :ref="`bubble_input_${randomKey}`"
      v-model="changedValue"
      class="lfx-forms-input_bubble-input"
      :class="[isFilled ? '-filled' : '', error ? '-error' : '', `-bubble_input_${randomKey}`]"
      :type="type"
      :dir="dir"
    />
    <span
      class="lfx-forms-input_bubble-placeholder text-secondary"
      :class="[`-bubble_input_${randomKey}`, isRtlMode ? 'text-right' : '']"
      @click="inputFocus()"
      v-text="label"
    />
  </div>
</template>

<script>
export default {
  name: 'FieldTextBubble',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      bubbleInput: null,
      isFilled: false,
      randomKey: 0
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    changedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  watch: {
    changedValue (newValue) {
      this.isFilled = newValue ? '-filled' : ''
    },
    isFilled (newValue) {
      if (newValue && this.bubbleInput) {
        this.inputFocus()
      }
    }
  },
  created () {
    this.randomKey = Math.floor(Math.random() * 1000000)

    if (this.changedValue) {
      this.isFilled = true
    }
  },
  mounted () {
    this.bubbleInput = this.$refs[`bubble_input_${this.randomKey}`]
    document.addEventListener('click', e => this.raisePlaceholder(e))
  },
  destroyed () {
    document.removeEventListener('click', e => this.raisePlaceholder(e))
  },
  methods: {
    inputFocus () {
      this.bubbleInput.focus()
    },
    raisePlaceholder (e) {
      switch (e.target.className) {
        case `lfx-forms-input_bubble-placeholder -bubble_input_${this.randomKey}`:
        case `lfx-forms-input_bubble-input -bubble_input_${this.randomKey}`:
          if (!this.changedValue) {
            this.isFilled = true
          }
          break
        default:
          if (!this.changedValue) {
            this.isFilled = false
          }
      }
    }
  }
}
</script>
