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
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Дата и время закрытия')" />
          <div class="d-flex align-items-center" :class="isRtlMode ? 'justify-content-end' : ''">
            <span v-if="!isRtlMode" class="text-secondary-15 mr-1" v-text="moment(copier.date_end).format('DD.MM.YYYY')" />
            <span class="text-dark-primary-15" v-text="moment(copier.date_end).format('HH:mm:ss')" />
            <span v-if="isRtlMode" class="text-secondary-15 ml-1" v-text="moment(copier.date_end).format('DD.MM.YYYY')" />
          </div>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center" :class="isRtlMode ? 'justify-content-end' : ''">
            <span v-if="!isRtlMode" class="text-secondary-15 mr-1" v-text="moment(copier.date_start).format('DD.MM.YYYY')" />
            <span class="text-dark-primary-15" v-text="moment(copier.date_start).format('HH:mm:ss')" />
            <span v-if="isRtlMode" class="text-secondary-15 ml-1" v-text="moment(copier.date_start).format('DD.MM.YYYY')" />
          </div>
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Дата и время закрытия')" />
          <div class="d-flex align-items-center" :class="isRtlMode ? 'justify-content-end' : ''">
            <span v-if="!isRtlMode" class="text-secondary-15 mr-1" v-text="moment(copier.date_end).format('DD.MM.YYYY')" />
            <span class="text-dark-primary-15" v-text="moment(copier.date_end).format('HH:mm:ss')" />
            <span v-if="isRtlMode" class="text-secondary-15 ml-1" v-text="moment(copier.date_end).format('DD.MM.YYYY')" />
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-3">
        <div v-if="isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Выход')" />
          <div class="d-flex align-items-center">
            <span class="text-dark-primary-15 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="`${copier.profit_end}%`" />
          </div>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Точка входа')" />
          <div class="d-flex align-items-center">
            <span class="text-dark-primary-15 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="`${copier.profit_start}%`" />
          </div>
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Выход')" />
          <div class="d-flex align-items-center">
            <span class="text-dark-primary-15 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="`${copier.profit_end}%`" />
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center w-100 mb-2">
        <div v-if="isRtlMode" class="d-flex flex-column w-50">
          <span
            class="text-uppercase text-secondary-10"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Моя прибыль')"
          />
          <div class="d-flex align-items-center">
            <span
              class="w-100"
              :class="[
                copier.profit > 0 ? 'text-success-15' : copier.profit < 0 ? 'text-danger-15' : 'text-dark-primary-15',
                isRtlMode ? 'text-right' : ''
              ]"
              v-text="`${Number(copier.commission).toFixed(2)} ${copier.currency}`"
            />
          </div>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-uppercase text-secondary-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Результат торговли')" />
          <bdi class="d-flex align-items-center">
            <span
              class="w-100"
              :class="[
                copier.profit > 0 ? 'text-success-15' : copier.profit < 0 ? 'text-danger-15' : 'text-dark-primary-15',
                isRtlMode ? 'text-right' : ''
              ]"
              v-text="`${Number(copier.profit).toFixed(2)} ${copier.currency}`"
            />
          </bdi>
        </div>
        <div v-if="!isRtlMode" class="d-flex flex-column w-50">
          <span
            class="text-uppercase text-secondary-10"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Моя прибыль')"
          />
          <div class="d-flex align-items-center">
            <span
              class="w-100"
              :class="[
                copier.profit > 0 ? 'text-success-15' : copier.profit < 0 ? 'text-danger-15' : 'text-dark-primary-15',
                isRtlMode ? 'text-right' : ''
              ]"
              v-text="`${Number(copier.commission).toFixed(2)} ${copier.currency}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupCopiersHistory',
  data () {
    return {
      moment
    }
  },
  computed: {
    copier () {
      return this.$store.getters['profile/getters/handler/getCurrentCopier']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
