<template>
  <div :style="windowWidth === 'sm' ? `display: flex; align-items: center; height: 100%; width: calc(100% - ${isGuest ? 120 : 180}px);` : ''">
    <div v-if="isDemo" class="lfx-demo_menu" :class="windowWidth === 'sm' ? '-mobile' : ''">
      <span v-if="windowWidth !== 'sm'" class="lfx-demo_menu-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Демо-режим')" />
      <div v-if="windowWidth === 'sm'" class="d-flex align-items-center" :class="windowWidth === 'sm' ? 'w-100 h-100' : ''">
        <div class="lfx-demo_menu-link-mobile" :class="formTitle === 'login' && isModalShown && !isPopupShown ? '-active' : ''" @click="fetchForm('login')">
          <span v-text="$t('Войти')" />
          <div v-if="formTitle === 'login' && isModalShown && !isPopupShown" class="lfx-demo_menu-link-mobile-pointer" />
        </div>
        <div class="lfx-demo_menu-link-mobile" :class="formTitle === 'registration' && isModalShown && !isPopupShown ? '-active' : ''" @click="fetchForm('registration')">
          <span v-text="$t('Регистрация')" />
          <div v-if="formTitle === 'registration' && isModalShown && !isPopupShown" class="lfx-demo_menu-link-mobile-pointer" />
        </div>
      </div>
      <div v-else class="d-flex align-items-center">
        <span
          class="lfx-demo_menu-link"
          :class="isRtlMode ? 'ml-3' : 'mr-3'"
          @click="fetchForm('login')"
          v-text="$t('Войти')"
        />
        <span
          class="lfx-demo_menu-link"
          @click="fetchForm('registration')"
          v-text="$t('Регистрация')"
        />
      </div>
    </div>
    <div
      v-else
      class="lfx-user_menu w-100"
      @click="toggleDropdown"
    >
      <b-dd
        ref="trade-mode"
        :lazy="true"
        toggle-class="lfx-user_menu-container"
        variant="link"
        :offset="isRtlMode ? '' : '16px'"
        boundary="viewport"
        @hidden="isAccountMenuOpened = false"
        @shown="isAccountMenuOpened = true"
      >
        <template #button-content>
          <div class="d-flex align-items-center w-100 justify-content-between">
            <div class="d-flex align-items-center">
              <div v-if="windowWidth !== 'sm'" class="lfx-user_menu-container-avatar" :class="`-${dir}`">
                <img v-if="user.avatar_url" class="lfx-user_menu-container-avatar-image" :src="user.avatar_url" alt>
                <div v-else class="lfx-user_menu-container-avatar-image" :class="{ '-empty': !user.avatar_url }">
                  <span v-text="user.avatar_name" />
                </div>
              </div>
              <div class="d-flex flex-column">
                <span class="lfx-user_menu-container-title" :class="isRtlMode ? 'text-right' : ''" v-text="user.full_name || user.email" />
                <div class="d-flex align-items-center">
                  <div v-if="user.is_vip" class="lfx-user_menu-container-vip" :class="`-${dir}`" v-text="'vip'" />
                  <div class="d-flex">
                    <span class="lfx-user_menu-container-mode" :class="getUserTradeMode('class')" v-text="getUserTradeMode('title')" />
                  </div>
                </div>
              </div>
            </div>
            <i class="lfx-user_menu-chevron">
              <lfx-icon-chevron-down :class="{ 'rotate_180': isAccountMenuOpened }" />
            </i>
          </div>
        </template>
        <div class="lfx-user_menu-container-items">
          <div
            v-if="[0, 1].includes(user.mode) && windowWidth !== 'sm'"
            class="lfx-user_menu-container-items-item px-4 text-center py-3"
          >
            <div v-if="user.mode === 1" class="lfx-user_menu-container-items-item-button -demo" @click="switchRealUserMode('demo')">
              <span v-text="$t('Включить демо торговлю')" />
            </div>
            <div v-else-if="user.mode === 0" class="lfx-user_menu-container-items-item-button -real" @click="switchRealUserMode('real')">
              <span v-text="$t('Включить реальную торговлю')" />
            </div>
          </div>
          <div
            class="lfx-user_menu-container-items-item -point px-4 py-3"
            :class="{ 'text-right': isRtlMode, '-hide_border': ![0, 1].includes(user.mode) || windowWidth === 'sm' }"
          >
            <span v-if="user.mode !== 2" @click="goToProfile" v-text="$t('Мой профиль')" />
            <span class="lfx-user_menu-container-items-item-bring_friend" @click="fetchBringFriendConditions" v-text="`${$t('Приведи друга')} & ${$t('Получи от {amount}', { amount: 50 })}$`" />
          </div>
          <div class="lfx-user_menu-container-items-item -point -points px-4 py-3" :class="isRtlMode ? 'text-right' : ''">
            <span class="mb-3" @click="goToDeposit" v-text="$t('Пополнение')" />
            <span class="mb-3" @click="goToWithdrawal" v-text="$t('Вывод')" />
            <span @click="goToFinanceHistory" v-text="$t('История переводов')" />
          </div>
          <div v-if="subUsers && subUsers.length" class="lfx-user_menu-container-items-item -point -points px-4 py-3" :class="isRtlMode ? 'text-right' : ''">
            <span
              v-for="(subUser, key) in subUsers"
              :key="subUser.id"
              :class="{ 'mb-3': key !== subUsers.length - 1 }"
              @click="fetchRealSubUser(subUser)"
              v-text="subUser.name"
            />
          </div>
          <div class="lfx-user_menu-container-items-item -point -icon px-4 py-3">
            <div class="d-flex align-items-center">
              <lfx-icon-logout :class="isRtlMode ? 'ml-4' : 'mr-4'" />
              <span @click="logout" v-text="$t('Выйти')" />
            </div>
          </div>
        </div>
      </b-dd>
    </div>
  </div>
</template>

<script>
import LfxIconLogout from './icons/lfx-icon-logout'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'HeaderTradeMode',
  components: { LfxIconChevronDown, LfxIconLogout },
  data () {
    return {
      page: 'authorization',
      isAccountMenuOpened: false
    }
  },
  computed: {
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPopupShown']
    },
    isModalShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsModalShown']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    subUsers () {
      return this.$store.getters['dictionaries/getters/user/getSubUsers']
    }
  },
  methods: {
    deleteAccountCurrency () {
      this.$store.commit('trading/mutations/socket/account/DELETE_ACCOUNT_CURRENCY', {
        rootData: this.$store.state.trading.state.handler
      })
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    toggleDropdown () {
      const dropdown = this.$refs['trade-mode']
      this.isAccountMenuOpened = !this.isAccountMenuOpened
      this.isAccountMenuOpened ? dropdown.show() : dropdown.hide()
    },
    getUserTradeMode (source) {
      let result
      switch (this.user.mode) {
        case 0:
          result = source === 'title' ? this.$t('Демо счет') : '-demo'
          break
        case 1:
          result = source === 'title' ? this.$t('Реальный счет') : '-real'
          break
        case 2:
          result = source === 'title' ? this.$t('Кабинет партнера') : '-affiliate'
          break
      }
      return result
    },
    switchRealUserMode (type) {
      this.deleteAccountCurrency()
      this.$store.dispatch('dictionaries/actions/auth/switchRealUserMode', type)
    },
    logout () {
      this.deleteAccountCurrency()
      this.$store.dispatch('dictionaries/actions/auth/logout')
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', {
        rootData: this.$store.state.chat.state.handler,
        data: false
      })
    },
    goToProfile () {
      this.$router.push(`/${this.routePages.locale}/profile`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'profile'
      })
    },
    goToDeposit () {
      this.$router.push(`/${this.routePages.locale}/finance/deposit`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'deposit'
      })
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    },
    goToWithdrawal () {
      this.$router.push(`/${this.routePages.locale}/finance/withdrawal`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'withdrawal'
      })
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    },
    goToFinanceHistory () {
      this.$router.push(`/${this.routePages.locale}/finance`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: null
      })
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    },
    fetchRealSubUser (user) {
      this.$store.dispatch('dictionaries/actions/auth/fetchRealSubUser', user.id)
    },
    fetchBringFriendConditions () {
      this.$store.dispatch('profile/actions/handler/fetchBringFriendConditions')
    }
  }
}
</script>
