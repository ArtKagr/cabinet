<template>
  <div class="metatrader-container">
    <span class="metatrader-container-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Торговые счета')" />
    <div class="metatrader-container-titles" :class="`-${dir}`">
      <span class="metatrader-container-titles-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Счет')" />
      <span class="metatrader-container-titles-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Всего')" />
      <span class="metatrader-container-titles-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Задействовано средств')" />
      <span class="metatrader-container-titles-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Доступно')" />
      <span class="metatrader-container-titles-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Плечо')" />
    </div>
    <div v-if="metatraderData.trading && metatraderData.trading.length" class="metatrader-container-trading_container">
      <div
        v-for="account in metatraderData.trading"
        :key="account.login"
        class="metatrader-container-block-trading mb-4"
        :class="[account.is_primary ? '-primary' : '', `-${dir}`]"
      >
        <div class="metatrader-container-block-trading-forms">
          <div class="metatrader-container-block-account_item">
            <span
              class="metatrader-container-block-account_item-title"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$t('Счет')"
            />
            <div v-if="account.is_trader" class="d-flex flex-column" :class="isRtlMode ? 'ml-2' : 'mr-2'">
              <span class="metatrader-container-block-account_item-main" v-text="account.label" />
              <b-button class="text-white-8 w-95" variant="success-badge" v-text="$t('Доступен для копирования')" />
            </div>
            <span v-else class="metatrader-container-block-account_item-main" v-text="account.label" />
            <span
              v-if="account.is_primary"
              class="metatrader-container-block-account_item-additional"
              v-text="$t('Основной')"
            />
            <span
              v-else-if="account.is_investor"
              class="metatrader-container-block-account_item-additional  text-primary -link"
              @click="openInvestorPage(account.investor_id)"
              v-text="`${$t('Копирование')} ${account.investor_name}`"
            />
            <span
              v-else
              class="metatrader-container-block-account_item-additional text-primary -link"
              :class="`-${dir}`"
              @click="openSetPrimaryPopup(account)"
              v-text="$t('Сделать основным')"
            />
          </div>
          <div class="metatrader-container-block-account_item">
            <span
              class="metatrader-container-block-account_item-title"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$t('Всего')"
            />
            <div class="metatrader-container-block-account_item-main" :class="`-${dir}`">
              <bdi v-text="`${currentNumberFormat(account.equity.toFixed(2))} ${account.currency_label}`" />
            </div>
          </div>
          <div class="metatrader-container-block-account_item">
            <span
              class="metatrader-container-block-account_item-title"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$t('Задействовано средств')"
            />
            <div class="metatrader-container-block-account_item-main" :class="`-${dir}`">
              <bdi v-text="`${currentNumberFormat(account.margin.toFixed(2))} ${account.currency_label}`" />
            </div>
          </div>
          <div class="metatrader-container-block-account_item">
            <span
              class="metatrader-container-block-account_item-title"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$t('Доступно')"
            />
            <div class="metatrader-container-block-account_item-main" :class="`-${dir}`">
              <bdi v-text="`${currentNumberFormat(account.margin_free.toFixed(2))} ${account.currency_label}`" />
            </div>
          </div>
          <span class="metatrader-container-block-account_item">
            <span
              class="metatrader-container-block-account_item-title"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$t('Плечо')"
            />
            <span class="metatrader-container-block-account_item-main" v-text="`1:${account.leverage}`" />
          </span>
          <span
            v-if="account.is_primary"
            class="metatrader-container-block-account_status"
            v-text="$t('Основной')"
          />
          <span
            v-else-if="account.is_investor"
            class="metatrader-container-block-account_status -primary -link"
            @click="openInvestorPage(account.investor_id)"
            v-text="`${$t('Копирование')} ${account.investor_name}`"
          />
          <span
            v-else-if="account.is_partner"
            class="metatrader-container-block-account_status"
            @click="openSetPrimaryPopup(account)"
            v-text="$t('Счет партнера')"
          />
          <span
            v-else
            class="metatrader-container-block-account_status -primary -link"
            @click="openSetPrimaryPopup(account)"
            v-text="$t('Сделать основным')"
          />
        </div>
        <div class="metatrader-container-button">
          <b-button variant="outline-primary" @click="openCurrentAccountPopup(account)" v-text="$t('Настройки')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MetatraderTradingAccounts',
  data () {
    return {
      page: 'metatrader'
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    metatraderData () {
      return this.$store.getters['metatrader/getters/handler/getMetatraderData']
    }
  },
  methods: {
    currentNumberFormat (payload) {
      return this.$numberFormat(payload)
    },
    openCurrentAccountPopup (account) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'mt-settings')
      this.$store.commit('metatrader/mutations/handler/SAVE_ACTUAL_ACCOUNT', {
        rootData: this.$store.state.metatrader.state.handler,
        data: account
      })
    },
    openSetPrimaryPopup (account) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'mt-set-primary')
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_FORM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: { page: 'metatrader' }
      })
      this.$store.commit('metatrader/mutations/handler/SAVE_ACTUAL_ACCOUNT', {
        rootData: this.$store.state.metatrader.state.handler,
        data: account
      })
    },
    setPrimaryAccount (account) {
      this.$store.dispatch('metatrader/actions/handler/setPrimaryAccount')
    },
    openInvestorPage (id) {
      this.$router.push(`/${this.routePages.locale}/traders/${id}`)
    }
  }
}
</script>
