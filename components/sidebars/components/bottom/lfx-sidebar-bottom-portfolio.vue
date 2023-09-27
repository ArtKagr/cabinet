<template>
  <div>
    <div class="main-page-bottom_sidebar-label_container-label" @click="toggleCollapse">
      <lfx-icon-chevron-down
        class="main-page-bottom_sidebar-label_container-label-icon"
        :class="[`-${dir}`, isTableShown ? '' : '-shown']"
      />
      <span class="main-page-bottom_sidebar-label_container-label-text" v-text="$t('Портфель')" />
    </div>
    <div class="resizable">
      <vue-resizable
        :height="height"
        :min-height="minHeight"
        :max-height="maxHeight"
        :width="currentNumberWindowWidth"
        :disable-attributes="['w']"
        :min-width="768"
      >
        <head-bottom-sidebar :columns="columns" @open-time-sort="toggleOpenTimeSort" />
        <vue-scroll>
          <div class="d-flex flex-column">
            <table-bottom-sidebar
              v-if="portfolio.length"
              source="bottom-portfolio"
              :items="portfolio"
              :fields="tableFields"
              :sort="openTimeSort"
              @hide-table="hideTable"
            />
            <span
              v-if="isAuthUser"
              v-b-toggle.trades-table
              class="main-page-bottom_sidebar-table-trades_history"
              @click="openTradesHistory"
              v-text="$t('История торговли')"
            />
          </div>
        </vue-scroll>
      </vue-resizable>
    </div>
  </div>
</template>

<script>
import VueResizable from 'vue-resizable/src/main'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
import HeadBottomSidebar from '~/components/tables/bottom-sidebar/head-bottom-sidebar'
import TableBottomSidebar from '~/components/tables/bottom-sidebar/table-bottom-sidebar'
export default {
  name: 'LfxSidebarBottomPortfolio',
  components: {
    TableBottomSidebar,
    HeadBottomSidebar,
    VueResizable,
    LfxIconChevronDown
  },
  data () {
    return {
      isTableShown: false,
      height: 0,
      minHeight: 0,
      maxHeight: 600,
      openTimeSort: 'asc'
    }
  },
  computed: {
    currentNumberWindowWidth () {
      return Number(this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth'])
    },
    portfolio () {
      return this.$store.getters['trading/getters/trading/getAccountPortfolio']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    tableFields () {
      return {
        trades: null,
        symbol: `${this.$t('Инструмент')}|${this.$t('Трейдер')}`,
        cmd: this.$t('Тип'),
        volume: this.$t('Объем сделки'),
        open_time: this.$t('Дата и время открытия'),
        open_price: this.$t('Точка входа'),
        current_level: this.$t('Текущий уровень'),
        sl: this.$t('Stop loss'),
        tp: this.$t('Take profit'),
        changedProfit: this.$t('Прибыль'),
        buttons: null,
        horizontal_dots: null
      }
    },
    columns () {
      return Object.entries(this.tableFields)
    }
  },
  methods: {
    toggleCollapse () {
      this.isTableShown = !this.isTableShown
      this.height = this.isTableShown ? 263 : 0
      this.minHeight = this.isTableShown ? 22 : 0
    },
    openTradesHistory () {
      this.$router.push(`/${this.routePages.locale}/profile/trades-history`)
      this.$store.dispatch('profile/actions/handler/fetchProfileTradesHistory')
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'trades-history'
      })
    },
    hideTable () {
      this.$root.$emit('bv::toggle::collapse', 'trades-table')
      this.isTableShown = false
      this.height = 0
    },
    toggleOpenTimeSort (sort) {
      this.openTimeSort = sort
    }
  }
}
</script>
<style lang="scss">
  .table-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-top: 1px solid #eaeced;

    &-column {
      font-size: 10px;
      color: #8e9aac;
      padding: 6px 9px 4px;
      text-transform: uppercase;
      line-height: 1;

      &.-cmd, &.-volume, &.-open_time {
        text-align: center;
      }

      &.-open_price, &.-current_level, &.-sl, &.-tp, &.-open_time {
        @media screen and (max-width: 1223px) {
          display: none;
        }
      }
    }
  }
  .resizable {
    background-color: #ebedee;

    &-table {
      border-right: none !important;
    }

    &-component {
      top: 0 !important;
    }
  }
</style>
