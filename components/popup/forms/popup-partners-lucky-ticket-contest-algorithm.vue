<template>
  <div class="popup-lucky-ticket-contest-algorithm">
    <div class="popup-lucky-ticket-contest-algorithm-head">
      <span
        class="popup-lucky-ticket-contest-algorithm-head-title"
        :class="`-${dir}`"
        v-text="$t('Алгоритм формирования счастливого числа')"
      />
    </div>
    <div class="popup-lucky-ticket-contest-algorithm-body">
      <span class="text-secondary-14 mb-2" v-text="description['popup-body']" />
      <div class="d-flex align-items-center justify-content-center w-100">
        <span v-for="(item, key) in ['X', 'Y', 'Z']" :key="key" class="text-secondary-56 mr-3" v-text="item" />
      </div>
      <div class="d-flex flex-column">
        <span class="text-secondary-14 mb-2" v-text="`${description['number-pattern-api'][0]} EURUSD`" />
        <span class="text-secondary-14 mb-2" v-text="`${description['number-pattern-api'][1]} GBPUSD`" />
        <span class="text-secondary-14" v-text="`${description['number-pattern-api'][2]} USDJPY`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPartnersLuckyTicketContestAlgorithm',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    description () {
      return this.$store.getters['partners/getters/handler/getLuckyTicketContestData'].description
    }
  }
}
</script>
<style lang="scss">
  .popup-lucky-ticket-contest-algorithm {
    display: flex;
    flex-direction: column;

    &-head {
      padding: 18px 20px;
      display: flex;
      align-items: center;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1.2;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      padding: 0 20px 30px;
    }
  }
</style>
