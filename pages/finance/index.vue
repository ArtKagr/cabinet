<template>
  <div class="finance-page">
    <div class="finance-page-head">
      <span class="finance-page-head-title" v-text="$t('История переводов')" />
      <div class="finance-page-head-filter" @click="showTransactionFilter">
        <lfx-icon-settings class="finance-page-head-filter-icon" />
        <span class="finance-page-head-filter-title" v-text="$t('Фильтр')" />
      </div>
    </div>
    <div v-if="items && items.length" class="finance-page-table">
      <span class="finance-page-table-head" />
      <!--      :class="!row.is_cancellable && row.type !== 'deposit' ? `${windowWidth === 'sm' ? '' : `-has_button-${dir}`}` : ''"-->
      <div v-for="row in items" :key="row.id" class="finance-page-table-row">
        <div class="finance-page-table-row-column -status" :class="`-${dir}`">
          <div class="finance-page-table-row-column-icon" :class="`-${dir}`">
            <lfx-icon-success v-if="row.status_name === 'success'" class="success" />
            <lfx-icon-clock v-else-if="row.status_name === 'pending'" class="clock" />
            <lfx-icon-clock v-else-if="row.status_name === 'cancelling'" class="clock" />
            <lfx-icon-error v-else-if="row.status_name === 'return'" class="error" />
          </div>
          <div class="finance-page-table-row-column-data">
            <span class="finance-page-table-row-column-data-time" v-text="moment(row.date).format('DD.MM.YYYY HH:mm')" />
            <div v-if="windowWidth === 'sm'" class="finance-page-table-row-column-data-description" v-html="row.description" />
          </div>
        </div>
        <div v-if="windowWidth !== 'sm'" class="finance-page-table-row-column -description" :class="`-${dir}`">
          <div v-html="row.description" />
        </div>
        <div class="finance-page-table-row-column -amount" :class="`-${dir}`">
          <div class="finance-page-table-row-column-amount">
            <span class="finance-page-table-row-column-amount-label" :class="[`-${dir}`, row.amount < 0 ? '-error' : '-success']" v-text="row.amount_label" />
            <span class="finance-page-table-row-column-amount-status_text" :class="`-${dir}`" v-text="row.status_text" />
            <div v-if="windowWidth === 'sm'" class="d-flex justify-content-end" :class="isRtlMode ? 'mr-auto' : 'ml-auto'">
              <b-button
                v-if="row.is_cancellable"
                variant="outline-danger"
                class="finance-page-table-row-cell-button -large`"
                @click="showWithdrawalCanceling(row)"
              >
                <lfx-icon-close class="finance-page-table-row-cell-icon -button -error" />
              </b-button>
              <b-button
                v-if="row.type === 'deposit'"
                variant="outline-primary"
                class="finance-page-table-row-cell-button -large"
                @click="repeatDeposit(row)"
              >
                <div class="d-flex align-items-center">
                  <lfx-icon-repeat class="finance-page-table-row-cell-icon -button -primary" />
                  <span :class="isRtlMode ? 'mr-2' : 'ml-2'" v-text="$t('Повторить')" />
                </div>
              </b-button>
            </div>
          </div>
        </div>
        <div v-if="windowWidth !== 'sm'" class="finance-page-table-row-column -button">
          <b-button
            v-if="row.is_cancellable"
            variant="outline-danger"
            class="finance-page-table-row-column-button"
            :class="`-${dir}`"
            @click="showWithdrawalCanceling(row)"
          >
            <lfx-icon-close class="finance-page-table-row-column-button-icon -danger" />
          </b-button>
          <b-button
            v-if="row.type === 'deposit' && row.status_name !== 'pending'"
            variant="outline-primary"
            class="finance-page-table-row-column-button"
            :class="`-${dir}`"
            @click="repeatDeposit(row)"
          >
            <lfx-icon-repeat class="finance-page-table-row-column-button-icon -primary" />
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxIconSuccess from '~/components/icons/lfx-icon-success'
import LfxIconClock from '~/components/icons/lfx-icon-clock'
import LfxIconClose from '~/components/icons/lfx-icon-close'
import LfxIconRepeat from '~/components/icons/lfx-icon-repeat'
import LfxIconSettings from '~/components/icons/lfx-icon-settings'
import LfxIconError from '~/components/icons/lfx-icon-error'
export default {
  name: 'History',
  components: { LfxIconError, LfxIconSettings, LfxIconRepeat, LfxIconClose, LfxIconClock, LfxIconSuccess },
  data () {
    return {
      moment
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('История переводов')} | ${this.$t('Финансы')}`)
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    items () {
      return this.$store.getters['finance/getters/handler/getFinanceHistory']
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    },
    pagination () {
      return this.$store.getters['finance/getters/handler/getFinanceHistoryPagination']
    }
  },
  watch: {
    scrollBottom (newValue) {
      if (newValue === 0 && this.pagination.page < this.pagination.page_count) {
        this.$store.dispatch('finance/actions/handler/fetchFinanceHistory', this.pagination.page + 1)
      }
    }
  },
  created () {
    this.$store.dispatch('finance/actions/handler/fetchFinanceHistory')
  },
  destroyed () {
    this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_TRANSACTION', { rootData: this.$store.state.finance.state.handler, data: {} })
  },
  methods: {
    async repeatDeposit (row) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_TRANSACTION', { rootData: this.$store.state.finance.state.handler, data: row })
      await this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', { rootData: this.$store.state.finance.state.handler, data: row.method })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'finance-repeat')
    },
    showWithdrawalCanceling (row) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_TRANSACTION', { rootData: this.$store.state.finance.state.handler, data: row })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'finance-cancel')
    },
    async showTransactionFilter () {
      await this.$store.dispatch('forms/actions/handler/fetchForm', 'financeHistory')
    }
  }
}
</script>
<style lang="scss">
  .finance-page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;

    @media screen and (max-width: 1400px) {
      width: 100%;
    }

    &-title {
      font-size: 20px;
      color: #3B4B68;
    }

    &-filter {
      display: flex;
      align-items: center;
      cursor: pointer;

      &-icon {
        fill: #3498db;
      }

      &-title {
        font-size: 13px;
        color: #3498db;
      }
    }
  }

  .finance-page-table {

    &-row {
      padding: 15px 10px;

      @media screen and (max-width: 767px) {
        display: flex;
        justify-content: space-between;
        padding: 15px 20px 15px 10px;
      }

      &-column {

        &.-status {
          display: flex;
          align-items: center;
          width: 160px;

          @media screen and (max-width: 767px) {
            width: 60%;
          }
        }

        &.-description {
          font-size: 13px;
          color: #202226;
          width: calc(100% - 360px);
        }

        &.-amount {
          width: 200px;
        }

        &.-button {
          width: 60px;
        }

        &-icon {
          margin: 0 10px;

          .success {
            width: 20px;
            height: 20px;
          }

          .clock {
            width: 20px;
            height: 20px;
          }

          .error {
            width: 20px;
            height: 20px;
          }
        }

        &-data {

          &-time {
            font-size: 11px;
            color: #5f6875;
          }

          &-description {
            font-size: 13px;
            color: #202226;
          }
        }

        &-amount {
          display: flex;
          flex-direction: column;

          &-label {
            font-size: 15px;
            font-weight: 500;
            line-height: 16px;
            text-align: end;

            &.-success {
              color: #82bd22;
            }

            &.-error {
              color: #db4646;
            }

          }

          &-status_text {
            font-size: 12px;
            color: #47505c;
            text-align: end;
          }
        }

        &-button {
          margin: 0 10px 0 20px;
          padding: 0;
          width: 32px;
          height: 32px;

          &-icon {

            &.-danger {
              width: 10px;
              height: 10px;
              fill: #ff4b55;
            }

            &.-primary {
              width: 16px;
              height: 16px;
            }
          }
        }
      }

    }
  }
</style>
