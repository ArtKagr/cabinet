<template>
  <div class="field-slider">
    <div class="field-slider-markers">
      <span class="field-slider-markers-min" v-text="`${min}%`" />
      <span class="field-slider-markers-max" v-text="`${max}%`" />
    </div>
    <div class="field-slider-container">
      <vue-range-slider
        v-model="changedValue"
        :reverse="!!isRtlMode"
        :min="min"
        :max="max"
        :tooltip-style="{ display: 'none' }"
        @slide-end="setValue($event)"
      />
    </div>
    <span class="field-slider-hint">
      <span class="field-slider-hint-title" v-text="$t('Выбранное значение:')" />
      <span class="field-slider-hint-value" v-text="` ${changedValue}%`" />
    </span>
  </div>
</template>

<script>
import VueRangeSlider from 'vue-range-component'
export default {
  name: 'FieldSlider',
  components: { VueRangeSlider },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      changedValue: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  created () {
    this.changedValue = this.value
  },
  methods: {
    setValue (value) {
      this.changedValue = value
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">
  .field-slider {
    display: flex;
    flex-direction: column;

    &-markers {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-min {

      }

      &-max {

      }
    }

    &-container {
      margin-bottom: 6px;

      .vue-range-slider {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }

    &-hint {

      &-title {

      }

      &-value {

      }
    }
  }
</style>
