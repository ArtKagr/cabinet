<template>
  <div class="d-flex flex-column">
    <div class="analytics_twitter_watcher">
      <div>
        <lfx-icon-twitter-watcher class="analytics_twitter_watcher-icon" />
      </div>
      <span v-if="daysLeft" class="analytics_twitter_watcher-status" v-text="daysLeft" />
      <span v-else class="analytics_twitter_watcher-status" v-text="$t('Отключено')" />
      <b-button
        v-if="!daysLeft"
        class="analytics_twitter_watcher-button"
        :class="`-${dir}`"
        variant="primary"
        @click="fetchForm('twitterWatcher')"
        v-text="$t('Активировать')"
      />
    </div>
    <div v-if="isTwitterWatcher" class="analytics_twitter_watcher_table">
      <lfx-table-twitter-watcher v-if="windowWidthNumber > 1000" :items="signals" />
      <template v-else>
        <div
          v-for="(signal, key) in signals"
          :key="key"
          class="analytics_twitter_watcher_table-card"
        >
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Инструмент')" />
            <div class="lfx-table-body-symbol_base" :class="`-${dir}`">
              <lfx-symbol :symbol="`${signal.symbol}${signal.symbol_base}`" />
              <span class="lfx-table-body-symbol_base-text" :class="`-${dir}`" v-text="`${signal.symbol}/${signal.symbol_base}`" />
            </div>
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Котировка')" />
            <span class="analytics_twitter_watcher_table-card-item-value" :class="`-${dir}`" v-text="signal.price" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Сигнал')" />
            <span v-if="signal.type === 'short'" class="lfx-table-body-type -sell line-height-1" :class="`-${dir}`" v-text="$t('Продавать')" />
            <span v-else-if="signal.type === 'long'" class="lfx-table-body-type -buy line-height-1" :class="`-${dir}`" v-text="$t('Покупать')" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Сила/Точность сигнала')" />
            <lfx-icon-tw-signal :accuracy="signal.accuracy" :class="`-${dir}`" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Актуальность')" />
            <span class="analytics_twitter_watcher_table-card-item-value" :class="`-${dir}`" v-text="signal.time_left" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Точка входа')" />
            <span class="analytics_twitter_watcher_table-card-item-value -bold" :class="`-${dir}`" v-text="signal.activation_price" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Take profit')" />
            <span class="analytics_twitter_watcher_table-card-item-value" :class="`-${dir}`" v-text="signal.take_profit" />
          </div>
          <div class="analytics_twitter_watcher_table-card-item">
            <span class="analytics_twitter_watcher_table-card-item-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
            <span class="analytics_twitter_watcher_table-card-item-value" :class="`-${dir}`" v-text="signal.stop_loss" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LfxIconTwitterWatcher from '~/components/icons/lfx-icon-twitter-watcher'
import LfxTableTwitterWatcher from '~/components/tables/lfx-table-twitter-watcher'
import LfxIconTwSignal from '~/components/icons/lfx-icon-tw-signal'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'AnalyticsTwitterWatcher',
  components: { LfxSymbol, LfxIconTwSignal, LfxTableTwitterWatcher, LfxIconTwitterWatcher },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    twitterWatcherData () {
      return this.$store.getters['analytics/getters/handler/getTwitterWatcherData']
    },
    signals () {
      return this.twitterWatcherData.signals
    },
    daysLeft () {
      return this.twitterWatcherData.days_left
    },
    isTwitterWatcher () {
      return this.user.is_twitter_watcher
    }
  },
  created () {
    if (this.signals && !this.signals.length && this.isTwitterWatcher) {
      this.$store.dispatch('analytics/actions/handler/fetchTwitterWatcherData')
    }
  },
  methods: {
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    }
  }
}
</script>
<style lang="scss">
  .analytics_twitter_watcher {
    display: flex;
    align-items: center;
    background-color: #232940;
    padding: 10px 20px;
    margin: 0 30px;
    max-width: 1200px;

    @media screen and (max-width: 767px) {
      //padding: 0 20px;
      margin-top: 20px;
    }

    &-icon {

    }

    &-status {
      font-size: 14px;
      color: #8e9aac;
      padding: 0 20px;
    }

    &-button {
      padding: 10px 30px;

      &.-ltr {
        margin-left: auto;
      }

      &.-rtl {
        margin-right: auto;
      }
    }
  }

  .analytics_twitter_watcher_table {
    margin: 16px 30px 30px;
    max-width: 1200px;

    &-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 20px;
      background-color: white;
      margin-bottom: 12px;
      padding: 20px 15px;
      border: 1px solid #d9dce1;

      &:last-child {
        margin-bottom: 0;
      }

      &-item {
        display: flex;
        flex-direction: column;

        &-title {
          font-size: 10px;
          color: #8e9aac;
          text-transform: uppercase;
          padding-bottom: 5px;

          &.-rtl {
            text-align: right;
          }
        }

        &-value {
          line-height: 1;
          font-size: 13px;
          color: #3B4B68;

          &.-bold {
            font-weight: 700;
          }

          &.-rtl {
            text-align: right;
          }
        }

        .lfx-table-body-type.-rtl {
          text-align: right;
        }
      }
    }
  }
</style>
