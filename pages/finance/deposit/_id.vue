<template>
  <div class="finance-method" :class="{ 'flex-column mt-3 px-3': windowWidth === 'sm' }">
    <div class="finance-method-card">
      <div v-if="info && info.type === 'card'" class="finance-method-card-form">
        <div class="finance-method-card-form-back" @click="goToDepositsPage">
          <lfx-icon-arrow-back class="finance-method-card-form-back-icon" :class="[`-${dir}`, isRtlMode ? 'rotate_180' : '']" />
          <span class="finance-method-card-form-back-title" v-text="$t('Вернуться к вариантам пополнения')" />
        </div>
        <span
          class="finance-method-card-form-title"
          :class="[isRtlMode ? 'text-right' : '', info && info.messages && info.messages.length ? '-messages' : '']"
          v-text="info.name"
        />
        <form-finance-deposit-card :key="cardFormKey" class="finance-method-card-form-container" />
      </div>
      <div v-else class="finance-method-card-form">
        <div class="finance-method-card-form-back" @click="goToDepositsPage">
          <lfx-icon-arrow-back class="finance-method-card-form-back-icon" :class="[`-${dir}`, isRtlMode ? 'rotate_180' : '']" />
          <span class="finance-method-card-form-back-title" v-text="$t('Вернуться к вариантам пополнения')" />
        </div>
        <span
          class="finance-method-card-form-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="info.name"
        />
        <form-finance-deposit-request :key="formKey" :is-footer-hidden="true" class="finance-method-card-form-container" />
      </div>
      <div class="finance-method-card-info" :class="`-${dir}`">
        <img class="finance-method-card-info-image" :src="info.icon" alt>
        <span
          class="finance-method-card-info-text"
          :class="[`-${dir}`, isRtlMode ? 'text-right' : '']"
          v-text="`${$t('Мин. платёж')} ${depositInfoData.min_amount || info.min_amount}`"
        />
        <span
          class="finance-method-card-info-text"
          :class="[`-${dir}`, isRtlMode ? 'text-right' : '']"
          v-text="`${$t('Комиссия')}: ${depositInfoData.commission || info.commission}`"
        />
      </div>
    </div>
    <div class="finance-method-add_data" :class="`-${dir}`">
      <div class="finance-page-payment-notes-note  -first">
        <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Служба поддержки')" />
        <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
          <span v-html="$t('Не смогли найти ответ? Обратитесь в {link}службу технической поддержки{/link}', { link: '<a class=support-link>', '/link': '</a>' })" />
        </span>
      </div>
      <div class="finance-page-payment-notes-note -first">
        <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
          <span v-html="$t('Компания возместит комиссию, которую Вы платите платежной системе при совершении депозита. Подробнее {link}читайте тут{linkEnd}. ', { link: '<a href=https://www.litefinance.org/ru/promo/no-comission/ target=_blank>', linkEnd: '</a>' })" />
        </span>
      </div>
      <template v-if="isLocal">
        <div v-if="local.information" class="finance-page-payment-notes-note -first">
          <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="local.information.title" />
          <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
            <span v-html="local.information.info" />
          </span>
        </div>
        <div v-if="local.rateCommission" class="finance-page-payment-notes-note -first">
          <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="local.rateCommission.title" />
          <div class="d-flex align-items-center bg-white">
            <div v-for="(text, key) in local.rateCommission.deposit" :key="key" class="d-flex flex-column" :style="{ padding: '15px 20px', background: 'white' }">
              <span :style="{ fontSize: '11px', color: 'rgba(93,104,120,.8)' }" :class="isRtlMode ? 'text-right' : ''" v-text="text.title" />
              <span :style="{ color: '#2c3542' }" :class="isRtlMode ? 'text-right' : ''" v-text="text.value" />
            </div>
            <div v-for="(text, key) in local.rateCommission.withdrawal" :key="key" class="d-flex flex-column" :style="{ padding: '15px 20px', background: 'white' }">
              <span :style="{ fontSize: '11px', color: 'rgba(93,104,120,.8)' }" :class="isRtlMode ? 'text-right' : ''" v-text="text.title" />
              <span :style="{ color: '#2c3542' }" :class="isRtlMode ? 'text-right' : ''" v-text="text.value" />
            </div>
          </div>
        </div>
        <template v-for="(item, key) in local.contacts">
          <div :key="`contact-${key}`" class="finance-page-payment-notes-note" :class="local.contacts.length > 1 && key !== local.contacts.length - 1 ? '-indent' : ''">
            <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="item.title" />
            <div class="d-flex flex-column" :style="{ padding: '15px 20px', background: 'white' }">
              <span :style="{ fontSize: '11px', color: 'rgba(93,104,120,.8)' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.title_name" />
              <span :style="{ color: '#2c3542' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.name" />
            </div>
            <div class="d-flex align-items-center bg-white">
              <div class="d-flex flex-column" :style="{ padding: '0 20px 15px 20px', background: 'white' }">
                <span :style="{ fontSize: '11px', color: 'rgba(93,104,120,.8)' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.title_email" />
                <span :style="{ color: '#3498db' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.email" />
              </div>
              <div v-if="item.phone" class="d-flex flex-column" :style="{ padding: '0 20px 15px 20px', background: 'white' }">
                <span :style="{ fontSize: '11px', color: 'rgba(93,104,120,.8)' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.title_phone" />
                <span :style="{ color: '#3498db' }" :class="isRtlMode ? 'text-right' : ''" v-text="item.phone" />
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import FormFinanceDepositRequest from '~/components/modal/forms/form-finance-deposit-request'
import LfxIconArrowBack from '~/components/icons/lfx-icon-arrow-back'
import FormFinanceDepositCard from '~/components/modal/forms/form-finance-deposit-card'
export default {
  name: 'CurrentDeposit',
  components: { FormFinanceDepositCard, LfxIconArrowBack, FormFinanceDepositRequest },
  data () {
    return {
      cardFormKey: null,
      formKey: null
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    local () {
      return this.$store.getters['finance/getters/handler/getDepositLocalData']
    },
    isLocal () {
      return Object.keys(this.local).length
    },
    depositInfoData () {
      return this.$store.getters['finance/getters/handler/getDepositInfoData']
    },
    activeMethod () {
      return this.$store.getters['finance/getters/handler/getActiveMethod']
    }
  },
  async created () {
    await this.saveMethod()
    await this.$store.dispatch('forms/actions/handler/fetchForm', 'depositRequest')
    await this.saveMenuLink('deposit')
  },
  mounted () {
    setTimeout(() => {
      const supportLink = document.querySelector('.support-link')
      supportLink.addEventListener('click', () => {
        this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      })
      this.recalculateKey()
    }, 1000)
  },
  destroyed () {
    this.$store.dispatch('forms/actions/handler/saveDepositLocal', {})
  },
  methods: {
    saveMenuLink (link) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: link
      })
    },
    saveMethod () {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', {
        rootData: this.$store.state.finance.state.handler,
        data: this.routePages.current
      })
    },
    goToDepositsPage () {
      this.$router.push(`/${this.routePages.locale}/finance/deposit`)
      localStorage.setItem('deposit_tab', 'all')
      this.recalculateKey()
    },
    recalculateKey () {
      this.cardFormKey = Math.floor(Math.random() * 1000000)
      this.formKey = Math.floor(Math.random() * 1000000)
    }
  }
}
</script>
<style lang="scss">
  .finance-method-add_data {
    display: flex;
    flex-direction: column;
    max-width: 33%;

    &.-ltr {
      margin-left: 20px;

      @media screen and (max-width: 767px) {
        margin-top: 20px;
        margin-left: 0;
      }
    }

    &.-rtl {
      margin-right: 20px;

      @media screen and (max-width: 767px) {
        margin-top: 20px;
        margin-right: 0;
      }
    }

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }

  .support-link {
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
</style>
