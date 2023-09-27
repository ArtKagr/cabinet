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
        <lfx-icon-sorting v-if="sort.flag === changedSort" class="icon-white" :class="isRtlMode ? 'mr-auto' : 'ml-auto'" />
      </div>
    </div>
    <div class="popup-card-display-body-button">
      <b-button class="w-100" variant="primary" @click="saveSort" v-text="$t('Применить')" />
    </div>
  </div>
</template>

<script>
import LfxIconCheckMark from '~/components/icons/lfx-icon-check-mark'
import LfxIconSorting from '~/components/icons/lfx-icon-sorting'
export default {
  name: 'PopupTradersSorting',
  components: { LfxIconSorting, LfxIconCheckMark },
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
        { title: this.$t('Избранное'), flag: 'favorite' },
        { title: this.$t('Популярные'), flag: 'total_equity' },
        { title: this.$t('Высокая доходность'), flag: 'profit' },
        { title: this.$t('Кол-во копирующих'), flag: 'investors_count' },
        { title: this.$t('Срок торговли'), flag: 'date' },
        { title: this.$t('Минимальный риск'), flag: 'risk' }
      ]
    },
    tradersDataManage () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    }
  },
  created () {
    this.changedSort = localStorage.getItem('traders_sorting')
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
      localStorage.setItem('traders_sorting', this.changedSort)
      this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_SORTING', {
        data: this.changedSort,
        rootData: this.$store.state.traders.state.handler
      })
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        data: { sort: this.changedSort },
        rootData: this.$store.state.traders.state.handler
      })
      if (this.tradersDataManage.sort) {
        this.$router.push(`/${this.routePages.locale}/traders/${this.changedSort.replace(/_/gi, '-')}`)
        this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: this.changedSort
        })
        this.$store.dispatch('traders/actions/handler/fetchTraders')
      }
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
