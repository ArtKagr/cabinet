<template>
  <div v-if="windowWidth === 'sm'">
    <div class="finance-page_mobile-popular">
      <span class="finance-page_mobile-popular-title" v-text="$t('Популярные способы')" />
      <div class="finance-page_mobile-popular-container">
        <template v-for="(method, key) in favoriteDepositMethods">
          <div
            :key="key"
            class="finance-page_mobile-popular-container-item"
            :class="{ '-active': openedMethod === key }"
            @click="openMethod(method, key)"
          >
            <div class="finance-page_mobile-popular-container-item-content">
              <div class="finance-page_mobile-popular-container-item-content-icon">
                <img :src="method.icon_svg" alt>
              </div>
              <div class="finance-page_mobile-popular-container-item-content-description">
                <span class="finance-page_mobile-popular-container-item-content-description-title" v-text="method.name" />
                <span class="finance-page_mobile-popular-container-item-content-description-min_amount" v-text="`${$t('Мин. платёж')} ${method.min_amount}`" />
                <span class="finance-page_mobile-popular-container-item-content-description-commission" v-text="`${$t('Комиссия')}: ${method.commission }`" />
              </div>
            </div>
            <div class="finance-page_mobile-popular-container-item-arrow">
              <lfx-icon-chevron-down :class="openedMethod === key ? 'when-open icon-gray rotate_180' : 'when-closed icon-gray'" />
            </div>
          </div>
          <div v-if="openedMethod === key" :key="`${key}-i`" class="finance-page_mobile-popular-container-item_content">
            <span class="finance-page-title" :class="isRtlMode ? 'text-right' : ''" v-text="depositInfo.name" />
            <form-finance-deposit-card v-if="depositInfo && depositInfo.type === 'card'" :key="cardFormKey" />
            <form-finance-deposit-request v-else :key="formKey" />
          </div>
        </template>
      </div>
    </div>
    <div v-if="depositMenu && depositMenu.length" class="finance-page_mobile-all">
      <span class="finance-page_mobile-all-title" v-text="$t('Все способы вывода')" />
      <div class="finance-page_mobile-all-content">
        <template v-for="(category, key) in depositMenu">
          <div
            :key="key"
            class="finance-page_mobile-all-content-item"
            :class="{ '-active': openedCategory === key }"
            @click="openCategory(category, key)"
          >
            <span class="finance-page_mobile-all-content-item-title" v-text="category.title" />
            <div class="finance-page_mobile-all-content-item-arrow">
              <lfx-icon-chevron-down :class="openedCategory === key ? 'when-open icon-gray rotate_180' : 'when-closed icon-gray'" />
            </div>
          </div>
          <div v-if="openedCategory === key" :key="`${key}-i`" class="finance-page_mobile-all-content-categories">
            <div
              v-for="(item, index) in activeDepositList"
              :key="index"
              class="finance-page_mobile-all-content-categories-category"
              @click="openDepositMethod(item)"
            >
              <div class="finance-page_mobile-all-content-categories-category-icon">
                <img :src="item.icon_svg" alt>
              </div>
              <span class="finance-page_mobile-all-content-categories-category-description" v-text="item.name" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-else class="finance-page">
    <div class="d-flex align-items-center">
      <span
        class="finance-page-title pointer"
        :class="[activeTab === 'popular' ? '-active' : '', isRtlMode ? 'ml-4' : 'mr-4']"
        @click="setActiveTab('popular')"
        v-text="$t('Популярные способы')"
      />
      <span
        class="finance-page-title pointer"
        :class="activeTab === 'all' ? '-active' : ''"
        @click="setActiveTab('all')"
        v-text="$t('Все способы пополнения')"
      />
    </div>
    <div v-if="activeTab === 'popular'" class="finance-page-payment">
      <div class="finance-page-payment-cards" :class="`-${dir}`">
        <finance-payment-card
          v-for="card in favoriteDepositMethods"
          :key="card.method"
          :payment-card="card"
          :active-card="activeMethod"
          @click.native="setActiveMethod(card)"
        />
      </div>
      <div class="finance-page-payment-form justify-content-between">
        <div :key="formKey" class="d-flex flex-column">
          <span class="finance-page-title" :class="isRtlMode ? 'text-right' : ''" v-text="depositInfo.name" />
          <form-finance-deposit-request />
        </div>
      </div>
      <div v-if="windowWidthNumber > 1000" class="finance-page-payment-notes" :class="`-${dir}`">
        <div class="finance-page-payment-notes-note -first">
          <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Служба поддержки')" />
          <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
            <span @click="openChat" v-html="$t('Не смогли найти ответ? Обратитесь в {link}службу технической поддержки{/link}', { link: '<a class=support-link>', '/link': '</a>' })" />
          </span>
        </div>
        <div class="finance-page-payment-notes-note">
          <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
            {{ $t('Компания возместит комиссию, которую Вы платите платежной системе при совершении депозита. Подробнее {link}читайте тут{linkEnd}. ', { link: '', linkEnd: '' }) }}
            <a
              class="finance-page-payment-notes-note-text-link"
              href="https://www.litefinance.org/ru/promo/no-comission/"
              target="_blank"
              v-text="$t('Подробнее читайте тут')"
            />.
          </span>
        </div>
      </div>
    </div>
    <template v-else>
      <lfx-menu
        v-if="depositMenu && depositMenu.length"
        class="pl-0"
        :menu="depositMenu"
        source="deposit"
        :active-item="activeDepositsTab"
        @click-handler="setActiveItem"
      />
      <div class="finance-page-payment_container">
        <finance-payment-card
          v-for="(method, key) in activeDepositList"
          :key="key"
          :payment-card="method"
          @click.native="openDepositMethod(method)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
import FinancePaymentCard from '~/components/finance/financePaymentCard'
import FormFinanceDepositRequest from '~/components/modal/forms/form-finance-deposit-request'
import FormFinanceDepositCard from '~/components/modal/forms/form-finance-deposit-card'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'Deposit',
  components: { LfxIconChevronDown, FormFinanceDepositCard, FormFinanceDepositRequest, FinancePaymentCard, LfxMenu },
  data () {
    return {
      activeItem: 'card',
      selectedCardName: null,
      activeTab: 'popular',
      openedMethod: null,
      openedCategory: null,
      cardFormKey: null,
      formKey: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Пополнение')} | ${this.$t('Финансы')}`)
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    depositInfo () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    activeDepositsTab () {
      return this.$store.getters['finance/getters/handler/getActiveDepositsTab']
    },
    activeMethod () {
      return this.$store.getters['finance/getters/handler/getActiveMethod']
    },
    depositMenu () {
      return this.$store.getters['finance/getters/handler/getDepositLinks']
    },
    activeDepositList () {
      const result = this.$store.getters['finance/getters/handler/getGroupedDepositList'].find(method => method.type === this.activeItem)
      return result && result.list ? result.list : []
    },
    favoriteDepositMethods () {
      return this.$store.getters['finance/getters/handler/getFavoriteDepositMethods']
    },
    selectedMethod () {
      const result = this.favoriteDepositMethods.find(card => card.method === this.activeMethod)
      return result && result.name ? result : { name: null }
    }
  },
  watch: {
    favoriteDepositMethods (newValue) {
      if (newValue && newValue.length && this.activeTab === 'popular') {
        if (newValue[0].method && newValue[0].name) {
          this.setActiveMethod({ method: newValue[0].method, name: newValue[0].name })
        }
      }
    }
  },
  created () {
    this.$store.dispatch('finance/actions/handler/fetchGroupedDepositList')

    const activeTab = localStorage.getItem('deposit_tab')

    if (activeTab) {
      this.activeTab = activeTab
      localStorage.removeItem('deposit_tab')
    }

    if (this.activeDepositsTab) {
      this.activeItem = this.activeDepositsTab
    }
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
    this.setActiveMethod({ method: null, name: null })
  },
  methods: {
    setActiveItem (flag) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_DEPOSITS_TAB', {
        rootData: this.$store.state.finance.state.handler,
        data: flag
      })
      this.activeItem = flag
    },
    setActiveMethod (card) {
      if (card.method && card.name) {
        this.selectedCardName = card.name
        this.saveMethod(card)
        this.fetchForm()
      }

      this.$store.dispatch('forms/actions/handler/saveDepositInfoResponse', [])
    },
    async fetchForm () {
      await this.$store.dispatch('forms/actions/handler/fetchForm', 'depositRequest')
      this.recalculateKey()
    },
    async openDepositMethod (card) {
      this.saveMethod(card)
      await this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_DEPOSIT_WITHDRAWAL_CARD', { rootData: this.$store.state.finance.state.handler, data: card })
      this.$router.push(`/${this.routePages.locale}/finance/deposit/${card.method}`)
    },
    setActiveTab (tab) {
      this.activeTab = tab

      if (tab === 'popular' && this.favoriteDepositMethods && this.favoriteDepositMethods.length) {
        this.setActiveMethod({ method: this.favoriteDepositMethods[0].method, name: this.favoriteDepositMethods[0].name })
      }
    },
    openChat () {
      this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
    },
    saveMethod (card) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', { rootData: this.$store.state.finance.state.handler, data: card.method })
    },
    openMethod (method, key) {
      this.openedMethod = this.openedMethod === key ? null : key
      this.setActiveMethod(method)
    },
    openCategory (category, key) {
      this.openedCategory = this.openedCategory === key ? null : key
      this.setActiveItem(category.flag)
    },
    recalculateKey () {
      this.cardFormKey = Math.floor(Math.random() * 1000000)
      this.formKey = Math.floor(Math.random() * 1000000)
    }
  }
}
</script>
