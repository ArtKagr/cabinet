<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -twitter_watcher -${windowWidth} -${dir}`"
    :thead-class="`lfx-table-head -twitter_watcher -${windowWidth}`"
    :tbody-class="`lfx-table-body -twitter_watcher -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -twitter_watcher -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol -primary" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Инструмент')" />
    </template>
    <template #head(price)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Котировка')" />
    </template>
    <template #head(type)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Сигнал')" />
    </template>
    <template #head(accuracy)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Сила/Точность сигнала')" />
    </template>
    <template #head(time_left)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Актуальность')" />
    </template>
    <template #head(activation_price)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Точка входа')" />
    </template>
    <template #head(take_profit)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Take profit')" />
    </template>
    <template #head(stop_loss)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Stop loss')" />
    </template>
    <!-- Rows -->
    <template #cell(symbol)="row">
      <div class="lfx-table-body-symbol_base" :class="`-${dir}`">
        <lfx-symbol :symbol="`${row.item.symbol}${row.item.symbol_base}`" />
        <span class="lfx-table-body-symbol_base-text" :class="`-${dir}`" v-text="`${row.item.symbol}/${row.item.symbol_base}`" />
      </div>
    </template>
    <template #cell(price)="row">
      <div class="lfx-table-body-text" :class="`-${dir}`">
        <bdi v-text="row.item.price" />
      </div>
    </template>
    <template #cell(type)="row">
      <div class="lfx-table-body-text" :class="`-${dir}`">
        <span v-if="row.item.type === 'short'" class="lfx-table-body-type -sell" v-text="$t('Продавать')" />
        <span v-else-if="row.item.type === 'long'" class="lfx-table-body-type -buy" v-text="$t('Покупать')" />
      </div>
    </template>
    <template #cell(accuracy)="row">
      <div class="lfx-table-body-signal">
        <lfx-icon-tw-signal :accuracy="row.item.accuracy" />
      </div>
    </template>
    <template #cell(time_left)="row">
      <div class="lfx-table-body-text" :class="`-${dir}`">
        <bdi v-text="row.item.time_left" />
      </div>
    </template>
    <template #cell(activation_price)="row">
      <div class="lfx-table-body-text -bold" :class="`-${dir}`">
        <bdi v-text="row.item.activation_price" />
      </div>
    </template>
    <template #cell(take_profit)="row">
      <div class="lfx-table-body-text" :class="`-${dir}`">
        <bdi v-text="row.item.take_profit" />
      </div>
    </template>
    <template #cell(stop_loss)="row">
      <div class="lfx-table-body-text" :class="`-${dir}`">
        <bdi v-text="row.item.stop_loss" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconTwSignal from '~/components/icons/lfx-icon-tw-signal'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'LfxTableTwitterWatcher',
  components: {
    LfxSymbol,
    LfxIconTwSignal
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      moment,
      fields: ['symbol', 'price', 'type', 'accuracy', 'time_left', 'activation_price', 'take_profit', 'stop_loss']
    }
  },
  computed: {
    changedFields () {
      return this.fields.map(field => ({ key: field }))
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    //
  }
}
</script>
<style lang="scss">
  .lfx-table-body {
    &-text {
      display: flex;
      font-size: 13px;
      color: #3B4B68;

      &.-bold {
        font-weight: 700;
      }
    }

    &-type {
      font-size: 13px;
      font-weight: 700;
    }

    &-symbol_base {
      display: flex;
      align-items: center;

      &-text {
        font-size: 15px;
        color: #3498db;
        font-weight: 500;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }
      }
    }

    &-signal {
      display: flex;
    }
  }
</style>
