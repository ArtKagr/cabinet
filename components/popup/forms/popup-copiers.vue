<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -copiers">
      <img v-if="copier.avatar_url" class="popup-trades_history_investment-head-logo" :src="copier.avatar_url" alt>
      <div v-else class="popup-trades_history_investment-head-logo">
        <span v-text="copier.avatar_name" />
      </div>
      <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="copier.name" />
    </div>
    <div class="popup-trades_history-data">
      <div class="d-flex align-items-center w-100 mb-3">
        <div v-if="isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Длительность')" />
          <div class="d-flex align-items-center">
            <span
              class="text-dark-primary-15 w-100"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$pluralize(copier.duration, [$t('день'), $t('дня'), $t('дней')])"
            />
          </div>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Начал копировать')" />
          <div class="d-flex align-items-center" :class="isRtlMode ? 'justify-content-end' : ''">
            <span v-if="!isRtlMode" class="text-secondary-15 mr-1" v-text="moment(copier.date).format('DD.MM.YYYY')" />
            <span class="text-dark-primary-15" v-text="moment(copier.date).format('HH:mm:ss')" />
            <span v-if="isRtlMode" class="text-secondary-15 ml-1" v-text="moment(copier.date).format('DD.MM.YYYY')" />
          </div>
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Длительность')" />
          <div class="d-flex align-items-center">
            <span
              class="text-dark-primary-15 w-100"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="$pluralize(copier.duration, [$t('день'), $t('дня'), $t('дней')])"
            />
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-3">
        <div class="d-flex flex-column w-100">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Тип копирования')" />
          <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="copier.copy_type" />
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-3">
        <div v-if="isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
          <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="`${copier.profit_sharing}%`" />
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Сумма копирования')" />
          <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(copier.amount || copier.amount_acc).toFixed(2)} ${copier.currency}`" />
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
          <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="`${copier.commission || copier.commission_acc || 0}%`" />
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-3">
        <div v-if="isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Текущее изменение')" />
          <span
            :class="[getClass(copier.floating || copier.floating_acc), isRtlMode ? 'text-right' : '']"
            v-text="`${Number(copier.floating || copier.floating_acc).toFixed(2)} ${copier.currency}`"
          />
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Результат торговли')" />
          <span
            :class="[getClass(copier.profit || copier.profit_acc), isRtlMode ? 'text-right' : '']"
            v-text="`${Number(copier.profit || copier.profit_acc).toFixed(2)} ${copier.currency}`"
          />
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Текущее изменение')" />
          <span
            :class="[getClass(copier.floating || copier.floating_acc), isRtlMode ? 'text-right' : '']"
            v-text="`${Number(copier.floating || copier.floating_acc).toFixed(2)} ${copier.currency}`"
          />
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-3">
        <div class="d-flex flex-column" :class="isRtlMode ? 'w-100' : 'w-50'">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Моя прибыль')" />
          <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(copier.profit_sharing || 0).toFixed(2)} ${copier.currency}`" />
        </div>
      </div>
      <div class="d-flex w-100 justify-content-center">
        <b-button v-if="copier.pause" variant="outline-primary" @click="accountCopyContinue(copier.account)" v-text="$t('Продолжить копирование')" />
        <b-button v-else variant="outline-secondary" @click="accountCopyPause(copier.account)" v-text="$t('Пауза копирования')" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupCopiers',
  data () {
    return {
      moment
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    currentPopup () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentPopup']
    },
    copier () {
      switch (this.currentPopup) {
        case 'copiers':
          return this.$store.getters['profile/getters/handler/getCurrentCopier']
        case 'copiers-partner':
          return this.$store.getters['profile/getters/handler/getCurrentCopierPartner']
        default:
          return null
      }
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    async accountCopyPause (account) {
      await this.$store.dispatch('profile/actions/handler/accountCopyPause', { account, source: this.currentPopup })
      await this.togglePopup(false)
    },
    async accountCopyContinue (account) {
      await this.$store.dispatch('profile/actions/handler/accountCopyContinue', { account, source: this.currentPopup })
      await this.togglePopup(false)
    },
    getClass (value) {
      return value > 0 ? 'text-success-15' : value < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    }
  }
}
</script>
