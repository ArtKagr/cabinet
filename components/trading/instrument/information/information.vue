<template>
  <div v-if="windowWidth === 'xl' || windowWidth === 'lg'" class="d-flex">
    <div class="d-flex flex-column" :class="[isRtlMode ? 'ml-4' : 'mr-4', windowWidth === 'sm' ? 'w-100' : '']">
      <general :instrument="instrument" :card="card" />
      <additional class="mt-4" />
    </div>
    <schedule :instrument="instrument" />
  </div>
  <div v-else-if="windowWidth === 'lg-md' || windowWidth === 'md'" class="d-flex flex-column">
    <general class="mb-4" :instrument="instrument" :card="card" />
    <div class="d-flex w-100 justify-content-between">
      <schedule :class="isRtlMode ? 'ml-4' : 'mr-4'" :instrument="instrument" />
      <additional class="d-flex w-100" />
    </div>
  </div>
  <div v-else-if="windowWidth === 'md-sm' || windowWidth === 'sm'" class="d-flex flex-column" :class="windowWidth === 'sm' ? 'px-2' : ''">
    <general class="mb-4" :instrument="instrument" :card="card" />
    <schedule class="mb-4" :instrument="instrument" />
    <additional class="d-flex w-100" />
  </div>
</template>

<script>
import General from '@/components/trading/instrument/information/components/general.vue'
import Additional from '@/components/trading/instrument/information/components/additional.vue'
import Schedule from '@/components/trading/instrument/information/components/schedule.vue'
export default {
  name: 'Information',
  components: {
    Additional,
    General,
    Schedule
  },
  props: {
    instrument: {
      type: Object,
      default: () => {
        return {
          symbol_original: null,
          category: null
        }
      }
    },
    card: {
      type: Object,
      default: () => {
        return {
          bid: 0,
          ask: 0,
          priceChange: 0
        }
      }
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  }
}
</script>
<style lang="scss">
.item {
  width: 80px;
}

.spread {
  width: 60px;
}
.add_info {
  display: flex;
  flex: 1;

  &-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;

    @media screen and (max-width: 1223px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &-work_hours {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 11px;
    width: 100%;
    min-width: 318px;

    &-work_hour {
      background: #eaeced;
      height: 5px;
      width: calc(100% / 24);

      //@media screen and (max-width: 1000px) {
      //  width: 10px;
      //}
      //
      //@media screen and (max-width: 768px) {
      //  width: 30px;
      //}

      &.-active {
        background: rgba(52,152,219,.25);
      }
    }
  }
}
</style>
