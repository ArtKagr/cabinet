<template>
  <div class="lfx-filter-select" :style="`width: ${width}px;`">
    <span v-if="title" class="lfx-filter-select-title" :class="`-${dir}`" v-text="title" />
    <div class="lfx-filter-select-container" :class="isOptionsOpened ? '-options_opened' : ''">
      <div class="lfx-filter-select-container-head" @click="toggleOptions">
        <span class="lfx-filter-select-container-head-value" :class="isUppercase ? 'text-uppercase' : ''" v-text="headTitle" />
        <div class="lfx-filter-select-container-head-chevron" :class="`-${dir}`">
          <lfx-icon-chevron-down :class="{ 'rotate_180': isOptionsOpened }" />
        </div>
      </div>
      <div v-if="isOptionsOpened" class="lfx-filter-select-container-options" :class="`-${dir}`">
        <div
          v-for="(option, key) in items"
          :key="key"
          class="lfx-filter-select-container-options-option"
          :class="[option.flag === activeFlag ? '-active' : '', isUppercase && option.flag !== 'all' ? 'text-uppercase' : '']"
          @click="setValue(option)"
          v-text="option.title || option.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'LfxFilterSelect',
  components: { LfxIconChevronDown },
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => ([])
    },
    // eslint-disable-next-line vue/require-prop-types
    activeFlag: {
      default: null
    },
    width: {
      type: Number,
      default: 30
    },
    isUppercase: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isOptionsOpened: false
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    headTitle () {
      const result = this.items.find(item => item.flag === this.activeFlag)

      if (result) {
        return result.title || result.description
      } else if (this.source === 'promo-size' || this.source === 'promo-language') {
        return this.$t('Любой')
      } else if (this.source === 'promo-category') {
        return this.$t('Любая')
      } else {
        return null
      }
    }
  },
  methods: {
    toggleOptions () {
      this.isOptionsOpened = !this.isOptionsOpened
    },
    setValue (option) {
      this.isOptionsOpened = false
      this.$emit('click-handler', option.flag)
    }
  }
}
</script>
<style lang="scss">
  .lfx-filter-select {
    display: flex;
    flex-direction: column;
    margin: 0 9px;

    &-title {
      font-size: 10px;
      text-transform: uppercase;
      color: #8e9aac;
      margin-bottom: 4px;

      &.-rtl {
        text-align: right;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;
      position: relative;
      border-radius: 3px;
      border: 1px solid #d9dce1;
      background-color: white;
      padding: 3px 0;

      &.-options_opened {
        border-radius: 3px 3px 0 0;
        border-top: 1px solid #d9dce1;
        border-right: 1px solid #d9dce1;
        border-bottom: 1px solid white;
        border-left: 1px solid #d9dce1;
      }

      &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        cursor: pointer;

        &-value {
          font-size: 14px;
          color: #3498db;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &-chevron {
          display: flex;
          align-items: center;

          svg {
            width: 10px;
            height: 10px;
          }

          &.-ltr {
            margin-left: 8px;
          }

          &.-rtl {
            margin-right: 8px;
          }
        }
      }

      &-options {
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 1000;
        top: 28px;
        width: calc(100% + 2px);
        background-color: white;
        border-right: 1px solid #d9dce1;
        border-bottom: 1px solid #d9dce1;
        border-left: 1px solid #d9dce1;
        max-height: 210px;
        overflow: auto;

        &.-ltr {
          transform: translateX(-1px);
        }

        &.-rtl {
          transform: translateX(1px);
          text-align: right;
        }

        &-option {
          padding: 7px 10px;
          font-size: 14px;
          line-height: 1;
          color: #8e9aac;
          cursor: pointer;

          &.-active, &:hover {
            color: #3498db;
          }
        }
      }
    }
  }
</style>
