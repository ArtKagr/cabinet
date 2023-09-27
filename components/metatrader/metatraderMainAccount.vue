<template>
  <div class="metatrader-container" :class="source === 'page' ? '-page' : ''">
    <span
      v-if="source === 'page'"
      class="metatrader-container-title"
      :class="isRtlMode ? 'text-right' : ''"
      v-text="$t('Основной счёт')"
    />
    <div
      class="metatrader-container-block"
      :class="source === 'page' ? `${isRtlMode ? '-right_border' : '-left_border'} -page` : ''"
    >
      <div v-if="source === 'page'" class="metatrader-container-block-head">
        <div class="metatrader-container-block-head-description">
          <span v-if="actualAccount.label" class="metatrader-container-block-head-description-title" :class="isRtlMode ? 'text-right' : ''" v-text="actualAccount.label" />
          <span v-if="actualAccount.label" class="metatrader-container-block-head-description-subtitle" :class="isRtlMode ? 'text-right' : ''" v-text="registrationDate" />
        </div>
        <div v-if="source === 'page'" class="metatrader-container-block-head-buttons -hidden_xs">
          <a :href="metatraderData.primary.terminal_link_pc" class="metatrader-container-block-head-buttons-button" :class="`-${dir}`">
            <b-button variant="outline-primary" v-text="$t('Скачать терминал')" />
          </a>
          <template v-if="vpsInfo && vpsInfo.vps_available && vpsInfo.vps">
            <div class="metatrader-container-block-head-buttons-vps">
              <div>
                <span class="metatrader-container-block-head-buttons-vps-title" v-text="vpsInfo.vps.name" />
              </div>
              <span class="metatrader-container-block-head-buttons-vps-value" v-text="$t('Осталось {amount} дн.', { amount: vpsInfo.vps.days_left })" />
            </div>
            <b-button
              class="metatrader-container-block-head-buttons-button"
              :class="isRtlMode ? 'ml-2' : 'mr-2'"
              variant="outline-dark-primary"
              @click="buyVps"
              v-text="$t('Продлить VPS')"
            />
          </template>
          <b-button
            v-else
            class="metatrader-container-block-head-buttons-button"
            :class="isRtlMode ? 'ml-2' : 'mr-2'"
            variant="outline-dark-primary"
            @click="buyVps"
            v-text="$t('Купить VPS')"
          />
          <b-button
            class="metatrader-container-block-head-buttons-button"
            variant="outline-danger"
            @click="showPopup('mt-reset-statistics')"
            v-text="$t('Обнулить статистику')"
          />
        </div>
      </div>
      <div class="metatrader-container-block-description" :class="source === 'page' ? '-page' : '-popup'">
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Логин')" />
          <span
            v-if="actualAccount.login"
            class="metatrader-container-block-description-item-value"
            :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
            v-text="actualAccount.login"
          />
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Сервер')" />
          <span
            v-if="actualAccount.server_name"
            class="metatrader-container-block-description-item-value"
            :class="[isRtlMode ? 'text-right ml-2' : 'mr-2', `-${source}`]"
            v-text="actualAccount.server_name"
          />
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Плечо')" />
          <div v-if="actualAccount.leverage" class="d-flex align-items-center">
            <span
              class="metatrader-container-block-description-item-value"
              :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
              v-text="`1:${actualAccount.leverage}`"
            />
            <span
              class="metatrader-container-block-description-item-change -link"
              @click="fetchForm('leverage')"
              v-text="$t('Изменить')"
            />
          </div>
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Валюта')" />
          <span
            v-if="actualAccount.currency"
            class="metatrader-container-block-description-item-value"
            :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
            v-text="actualAccount.currency"
          />
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Имя')" />
          <div v-if="actualAccount.name" class="d-flex" :class="source === 'popup' ? 'flex-column' : 'align-items-center'">
            <span
              class="metatrader-container-block-description-item-value"
              :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
              v-text="actualAccount.name"
            />
            <span
              class="metatrader-container-block-description-item-change -link"
              @click="fetchForm('name')"
              v-text="$t('Изменить')"
            />
          </div>
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Пароль трейдера')" />
          <div v-if="actualAccount.name" class="d-flex align-items-center">
            <span
              class="metatrader-container-block-description-item-value"
              :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
              v-text="'******'"
            />
            <span
              class="metatrader-container-block-description-item-change -link"
              @click="fetchForm('password')"
              v-text="$t('Изменить')"
            />
          </div>
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Пароль инвестора')" />
          <div v-if="actualAccount.name" class="d-flex align-items-center">
            <span
              class="metatrader-container-block-description-item-value"
              :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
              v-text="'******'"
            />
            <span
              class="metatrader-container-block-description-item-change -link"
              @click="fetchForm('investorPassword')"
              v-text="$t('Изменить')"
            />
          </div>
        </div>
        <div class="metatrader-container-block-description-item" :class="`-${source}`">
          <span class="metatrader-container-block-description-item-title" :class="`-${dir}`" v-text="$t('Телефонный пароль')" />
          <div v-if="actualAccount.name" class="d-flex align-items-center">
            <span
              class="metatrader-container-block-description-item-value"
              :class="isRtlMode ? 'text-right ml-2' : 'mr-2'"
              v-text="'******'"
            />
            <span
              class="metatrader-container-block-description-item-change -link"
              @click="fetchForm('phonePassword')"
              v-text="$t('Изменить')"
            />
          </div>
        </div>
      </div>
      <div v-if="source === 'page'" class="metatrader-container-block-head-buttons -hidden_lg">
        <a :href="metatraderData.primary.terminal_link_pc" class="metatrader-container-block-head-buttons-button" :class="`-${dir}`">
          <b-button variant="outline-primary" v-text="$t('Скачать терминал')" />
        </a>
        <b-button
          class="metatrader-container-block-head-buttons-button"
          :class="isRtlMode ? 'ml-2' : 'mr-2'"
          variant="outline-dark-primary"
          @click="buyVps"
          v-text="$t('Купить VPS')"
        />
        <b-button
          v-if="user.is_trader"
          class="metatrader-container-block-head-buttons-button"
          variant="outline-danger"
          v-text="$t('Обнулить статистику')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MetatraderMainAccount',
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      moment,
      page: 'metatrader'
    }
  },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    metatraderData () {
      return this.$store.getters['metatrader/getters/handler/getMetatraderData']
    },
    actualAccount () {
      return this.source === 'page'
        ? this.$store.getters['metatrader/getters/handler/getMetatraderData'].primary
        : this.$store.getters['metatrader/getters/handler/getActualAccount']
    },
    registrationDate () {
      return `${this.$t('Создан {date}', { date: moment(this.metatraderData.primary.reg_date).format('DD.MM.YYYY') })}
      (${this.$pluralize(this.moment().diff(this.metatraderData.primary.reg_date, 'days') + 1, [this.$t('день'), this.$t('дня'), this.$t('дней')])})`
    },
    vpsInfo () {
      return this.$store.getters['metatrader/getters/handler/getVpsInfo']
    }
  },
  methods: {
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
      if (this.source === 'popup') {
        this.togglePopup(false)
      }
    },
    buyVps () {
      if (this.user.is_verified) {
        this.fetchForm('buyVps')
      } else {
        this.openErrorToast('Извините, но новые запросы на заказ VPS доступны только верифицированным клиентам.')
      }
    },
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    openErrorToast (description) {
      this.$store.dispatch('dictionaries/actions/handler/openErrorToast', { description }, { root: true })
    },
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    }
  }
}
</script>
