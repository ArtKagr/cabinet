<template>
  <div class="metatrader">
    <metatrader-main-account source="page" />
    <metatrader-internal-transfer v-if="user.mode === 1" />
    <metatrader-trading-accounts />
    <div class="metatrader-container">
      <div class="metatrader-container-block -open_account -page mt-4">
        <b-button
          :class="isRtlMode ? 'ml-3' : 'mr-3'"
          :variant="isAuthUserDemo ? 'outline-dark-primary' : 'primary'"
          @click="fetchForm(isAuthUserDemo ? 'newDemo' : 'newReal')"
          v-text="$t('Открыть счет')"
        />
        <div class="metatrader-container-block-open_account">
          <div class="metatrader-container-block-open_account-icon" :class="isRtlMode ? 'ml-2' : 'mr-2'">
            <lfx-icon-info />
          </div>
          <span class="metatrader-container-block-open_account-text" :class="isRtlMode ? 'text-right' : ''" v-text="accountCounter" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MetatraderMainAccount from '~/components/metatrader/metatraderMainAccount'
import MetatraderInternalTransfer from '~/components/metatrader/metatraderInternalTransfer'
import MetatraderTradingAccounts from '~/components/metatrader/metatraderTradingAccounts'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
export default {
  name: 'Mt',
  components: {
    MetatraderMainAccount,
    MetatraderInternalTransfer,
    MetatraderTradingAccounts,
    LfxIconInfo
  },
  middleware: ['auth'],
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('MetaTrader')}`)
    }
  },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    activeForm () {
      return this.$store.getters['dictionaries/getActiveForm']
    },
    metatraderData () {
      return this.$store.getters['metatrader/getters/handler/getMetatraderData']
    },
    accountCounter () {
      return this.$t('У вас уже {open} {account}', {
        open: this.metatraderData.trading.length === 1 ? this.$t('открыт') : this.$t('открыто'),
        account: this.$pluralize(this.metatraderData.trading.length, [this.$t('счет'), this.$t('счета'), this.$t('счетов')])
      })
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    async 'user.mode' () {
      await this.$store.commit('dictionaries/mutations/handler/CLEAR_ACTIVE_FORM', { rootData: this.$store.state.dictionaries.state.handler })
      await this.$store.dispatch('metatrader/actions/handler/fetchMetatraderData')
    }
  },
  created () {
    this.$store.commit('dictionaries/mutations/handler/CLEAR_ACTIVE_FORM', { rootData: this.$store.state.dictionaries.state.handler })
    this.$store.dispatch('metatrader/actions/handler/fetchMetatraderData')
    this.$store.dispatch('metatrader/actions/handler/fetchVpsInfo')
  },
  methods: {
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    }
  }
}
</script>
