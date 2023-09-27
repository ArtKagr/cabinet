<template>
  <div v-if="windowWidth === 'sm'" class="finance-page_mobile">
    <div class="finance-page_mobile-popular">
      <span class="finance-page_mobile-popular-title" v-text="$t('Популярные способы')" />
      <div class="finance-page_mobile-popular-container">
        <template v-for="(method, key) in favoriteWithdrawalMethods">
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
                <span class="finance-page_mobile-popular-container-item-content-description-commission" v-text="`${$t('Комиссия')} ${method.commission}`" />
              </div>
            </div>
            <div class="finance-page_mobile-popular-container-item-arrow">
              <lfx-icon-chevron-down :class="openedMethod === key ? 'when-open icon-gray rotate_180' : 'when-closed icon-gray'" />
            </div>
          </div>
          <div v-if="openedMethod === key" :key="`${key}-i`" class="finance-page_mobile-popular-container-item_content">
            <span class="finance-page-title" :class="isRtlMode ? 'text-right' : ''" v-text="withdrawalInfo.name" />
            <form-finance-withdrawal-request id="withdrawalRequest" :prop-form="propForm" />
          </div>
        </template>
      </div>
    </div>
    <div v-if="withdrawalMenu && withdrawalMenu.length" class="finance-page_mobile-all">
      <span class="finance-page_mobile-all-title" v-text="$t('Все способы вывода')" />
      <div class="finance-page_mobile-all-content">
        <template v-for="(category, key) in withdrawalMenu">
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
              v-for="(item, index) in activeWithdrawalList"
              :key="index"
              class="finance-page_mobile-all-content-categories-category"
              @click="openWithdrawalMethod(item)"
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
        :class="[isRtlMode ? 'ml-4' : 'mr-4', activeTab === 'popular' ? '-active' : '']"
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
    <div v-if="activeTab === 'popular' && withdrawalInfo.name" class="finance-page-payment">
      <div class="finance-page-payment-cards" :class="`-${dir}`">
        <finance-payment-card
          v-for="card in favoriteWithdrawalMethods"
          :key="card.method"
          :payment-card="card"
          :active-card="activeMethod"
          @click.native="setActiveMethod(card)"
        />
      </div>
      <div class="finance-page-payment-form justify-content-between">
        <div class="d-flex flex-column">
          <span class="finance-page-title" :class="isRtlMode ? 'text-right' : ''" v-text="withdrawalInfo.name" />
          <form-finance-withdrawal-request id="withdrawalRequest" :key="formKey" :prop-form="propForm" />
        </div>
      </div>
      <div v-if="windowWidthNumber > 1000" class="finance-page-payment-notes" :class="`-${dir}`">
        <div class="finance-page-payment-notes-note -first">
          <span class="finance-page-payment-notes-note-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Служба поддержки')" />
          <span class="finance-page-payment-notes-note-text" :class="isRtlMode ? 'text-right' : ''">
            <span @click="openChat" v-html="$t('Не смогли найти ответ? Обратитесь в {link}службу технической поддержки{/link}', { link: '<a class=support-link>', '/link': '</a>' })" />
          </span>
        </div>
      </div>
    </div>
    <template v-else>
      <lfx-menu
        v-if="withdrawalMenu && withdrawalMenu.length"
        class="pl-0"
        :menu="withdrawalMenu"
        source="withdrawal"
        :active-item="activeItem"
        @click-handler="setActiveItem"
      />
      <div class="finance-page-payment_container">
        <finance-payment-card
          v-for="(method, key) in activeWithdrawalList"
          :key="key"
          :payment-card="method"
          @click.native="openWithdrawalMethodPage(method)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
import FinancePaymentCard from '~/components/finance/financePaymentCard'
import FormFinanceWithdrawalRequest from '~/components/modal/forms/form-finance-withdrawal-request'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'Withdrawal',
  components: {
    LfxIconChevronDown,
    FormFinanceWithdrawalRequest,
    FinancePaymentCard,
    LfxMenu
  },
  data () {
    return {
      activeItem: 'card',
      selectedCardName: null,
      activeTab: 'popular',
      openedMethod: null,
      openedCategory: null,
      propForm: [],
      formKey: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Вывод')} | ${this.$t('Финансы')}`)
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
    form () {
      return this.$store.getters['forms/getters/handler/getForm']
    },
    activeWithdrawalTab () {
      return this.$store.getters['finance/getters/handler/getActiveWithdrawalTab']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    activeMethod () {
      return this.$store.getters['finance/getters/handler/getActiveMethod']
    },
    withdrawalMenu () {
      return this.$store.getters['finance/getters/handler/getWithdrawalLinks'] || []
    },
    activeWithdrawalList () {
      const result = this.$store.getters['finance/getters/handler/getGroupedWithdrawalList'].find(method => method.type === this.activeItem)
      return result && result.list ? result.list : []
    },
    favoriteWithdrawalMethods () {
      return this.$store.getters['finance/getters/handler/getFavoriteWithdrawalMethods']
    },
    withdrawalInfo () {
      return this.$store.getters['finance/getters/handler/getWithdrawalInfo']
    }
  },
  watch: {
    favoriteWithdrawalMethods (newValue) {
      if (newValue && newValue.length) {
        this.setActiveMethod({ method: newValue[0].method, name: newValue[0].name })
      }
    },
    form (newValue) {
      if (this.formTitle === 'withdrawalRequest') {
        this.propForm = newValue
      }
    }
  },
  async created () {
    await this.$store.dispatch('finance/actions/handler/fetchGroupedWithdrawalList')

    const activeTab = localStorage.getItem('withdrawal_tab')

    if (activeTab) {
      this.activeTab = activeTab
      localStorage.removeItem('withdrawal_tab')
    }

    if (this.activeWithdrawalTab) {
      this.activeItem = this.activeWithdrawalTab
    }
  },
  mounted () {
    setTimeout(() => {
      const supportLink = document.querySelector('.support-link')
      this.setOpenChartMethod(supportLink)
      const supportLinkForm = document.querySelector('.js_support_link')
      this.setOpenChartMethod(supportLinkForm)
      this.recalculateKey()
    }, 1000)
  },
  destroyed () {
    this.setActiveMethod({ method: null, name: null })
  },
  methods: {
    setActiveItem (flag) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_WITHDRAWAL_TAB', {
        rootData: this.$store.state.finance.state.handler,
        data: flag
      })
      this.activeItem = flag
    },
    async setActiveMethod (card) {
      this.selectedCardName = card.name
      await this.saveMethod(card.method)
      await this.fetchForm()
    },
    async fetchForm () {
      await this.$store.dispatch('forms/actions/handler/fetchForm', 'withdrawalRequest')
      this.recalculateKey()
    },
    async openWithdrawalMethod (card) {
      await this.saveMethod(card.method)
      await this.$store.dispatch('forms/actions/handler/fetchForm', 'withdrawalRequestModal')
    },
    async openWithdrawalMethodPage (card) {
      await this.saveMethod(card.method)
      this.$router.push(`/${this.routePages.locale}/finance/withdrawal/${card.method}`)
    },
    setActiveTab (tab) {
      this.activeTab = tab
    },
    openChat () {
      this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', {
        rootData: this.$store.state.chat.state.handler,
        data: true
      })
    },
    async saveMethod (method) {
      await this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', {
        rootData: this.$store.state.finance.state.handler,
        data: method
      })
    },
    openMethod (method, key) {
      this.openedMethod = this.openedMethod === key ? null : key
      this.setActiveMethod(method)
    },
    openCategory (category, key) {
      this.openedCategory = this.openedCategory === key ? null : key
      this.setActiveItem(category.flag)
    },
    setOpenChartMethod (elem) {
      elem.addEventListener('click', () => {
        this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      })
    },
    recalculateKey () {
      this.formKey = Math.floor(Math.random() * 1000000)
    }
  }
}
</script>
<style lang="scss">
.finance-page_mobile {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &-popular {
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 18px;
      color: #3B4B68;
      padding: 20px 10px;
    }

    &-container {
      display: flex;
      flex-direction: column;
      padding: 0 10px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        background-color: white;
        padding: 15px 20px;
        border-radius: 3px;
        height: 100px;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0;
        }

        &.-active {
          margin-bottom: 0;
          box-shadow: 0 12px 20px rgb(196 196 196 / 20%);
          z-index: 10;
        }

        &-content {
          display: flex;
          align-items: center;

          &-icon {
            margin-right: 25px;

            img {
              width: 25px;
              height: 25px;
            }
          }

          &-description {
            display: flex;
            flex-direction: column;

            &-title {
              font-size: 17px;
              font-weight: 500;
              color: #5f6875;
              margin-bottom: 5px;
              line-height: 1.2;
            }

            &-min_amount {
              font-size: 10px;
              color: #8e9aac;
            }

            &-commission {
              font-size: 10px;
              color: #8e9aac;
            }
          }
        }

        &-arrow {
          //
        }
      }

      &-item_content {
        background-color: white;
        padding: 15px 20px;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &-all {
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 18px;
      color: #3B4B68;
      padding: 20px 10px;
    }

    &-content {
      padding: 0 10px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f0f6fa;
        border: 1px solid #d9dce1;
        margin-bottom: 20px;
        padding: 12px 20px;
        cursor: pointer;

        &.-active {
          margin-bottom: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &-title {
          font-size: 14px;
          color: #3B4B68;
          line-height: 1.2;
          font-weight: 500;
        }

        &-arrow {

        }
      }

      &-categories {
        display: flex;
        flex-direction: column;
        border-left: 1px solid #d9dce1;
        border-right: 1px solid #d9dce1;
        margin-bottom: 20px;
        border-radius: 0 3px 3px 0;

        &-category {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          background-color: white;
          border-bottom: 1px solid #d9dce1;
          cursor: pointer;

          &-icon {
            margin-right: 20px;

            img {
              width: 25px;
              height: 25px;
            }
          }

          &-description {
            font-size: 14px;
            color: #3498db;
          }
        }
      }
    }
  }
}
</style>
