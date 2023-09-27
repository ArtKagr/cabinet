<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Сортировка')" />
    </div>
    <div class="popup-card-display-body">
      <div
        v-for="sort in sorting"
        :key="sort.flag"
        class="d-flex align-items-center text-secondary-14 pointer py-3 px-4 border-top-light_secondary"
        :class="[sort.flag === changedSort ? 'active_tab' : 'padding_left', isRtlMode ? 'justify-content-end' : '']"
        @click="updateSort(sort.flag)"
      >
        <lfx-icon-check-mark v-if="sort.flag === changedSort" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        <span :class="isRtlMode ? 'w-100 text-right' : ''" v-text="sort.title" />
      </div>
    </div>
    <div class="popup-card-display-body-button">
      <b-button class="w-100" variant="primary" @click="saveSort" v-text="$t('Применить')" />
    </div>
  </div>
</template>

<script>
import LfxIconCheckMark from '~/components/icons/lfx-icon-check-mark'
export default {
  name: 'PopupTradingSorting',
  components: { LfxIconCheckMark },
  data () {
    return {
      changedSort: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    sorting () {
      return [
        { title: this.$t('Название'), flag: 'name' },
        { title: this.$t('Популярность'), flag: 'popularity' },
        { title: this.$t('Волатильность'), flag: 'volatility' },
        { title: this.$t('Рост'), flag: 'rise' },
        { title: this.$t('Падение'), flag: 'fall' }
      ]
    },
    activeSorting () {
      return this.$store.getters['trading/getters/handler/getActiveTradeSorting']
    }
  },
  created () {
    this.changedSort = this.activeSorting
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    updateSort (sort) {
      this.changedSort = sort
    },
    saveSort () {
      this.$store.dispatch('trading/actions/handler/tradingCardsSort', this.changedSort)
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.padding_left {
  padding-left: 60px !important;
}
.active_tab {
  background-color: #3498db;
  color: white;
}
</style>
