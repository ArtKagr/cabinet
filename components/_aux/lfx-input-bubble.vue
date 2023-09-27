<template>
  <div class="d-flex flex-column w-100">
    <div class="lfx-forms-input_bubble">
      <b-form-input
        v-model="inputValue"
        class="lfx-forms-input_bubble-input"
        :class="isInputFilled ? '-filled' : ''"
        @click="setInputClass"
      />
      <span
        class="lfx-forms-input_bubble-placeholder"
        v-text="placeholder"
      />
    </div>
    <span class="lfx-forms-input_bubble-error" v-text="error" />
  </div>
</template>

<script>
export default {
  name: 'LfxInputBubble',
  props: {
    placeholder: {
      type: String,
      default: 'Title'
    },
    error: {
      type: String,
      default: 'error text message'
    }
  },
  data () {
    return {
      inputValue: null,
      isInputFilled: false
    }
  },
  watch: {
    inputValue (newValue) {
      this.isInputFilled = newValue ? '-filled' : ''
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      switch (e.target.className) {
        case 'lfx-forms-input_bubble-placeholder':
        case 'lfx-forms-input_bubble-input':
          if (!this.inputValue) {
            this.isInputFilled = true
          }
          break
        default:
          if (!this.inputValue) {
            this.isInputFilled = false
          }
      }
    })
  },
  methods: {
    setInputClass () {
      this.isInputFilled = true
    }
  }
}
</script>
