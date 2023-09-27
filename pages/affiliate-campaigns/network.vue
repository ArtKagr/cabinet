<template>
  <div class="partners-campaigns">
    <div class="partners-campaigns-head">
      <span class="partners-campaigns-head-title" v-text="$t('Реферальная сеть')" />
      <div class="partners-campaigns-head-filter">
        <input id="air-datepicker">
      </div>
    </div>
    <div class="partners-campaigns-stat">
      <div class="partners-campaigns-stat-item">
        <bdi
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(referralsData.deposit || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Пополнение')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(referralsData.withdrawal || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Вывод')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(referralsData.cash_back || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="'Cashback'"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(referralsData.commission || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Комиссия')"
        />
      </div>
    </div>
    <div class="partners-campaigns-head mb-2 mt-4">
      <span class="partners-campaigns-head-title" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="$t('Рефералы')" />
      <div class="d-flex align-items-center" :class="windowWidthNumber <= 1223 ? 'w-100 justify-content-between' : ''">
        <div class="d-flex align-items-center pointer" :class="isRtlMode ? 'ml-4' : 'mr-4'" @click="showPopup('partners-ref-table-settings')">
          <lfx-icon-settings2 :class="isRtlMode ? 'ml-3' : 'mr-3'" />
          <span class="text-primary-14" v-text="$t('Настройка таблицы')" />
        </div>
        <!--        <div class="d-flex align-items-center pointer ml-2">-->
        <!--          <span class="text-dark-primary-13 mr-3" style="color: #6d788a !important;" v-text="'Только активные'" />-->
        <!--          <lfx-icon-switch2-on v-if="activity === 1" @click.native="setReferralsActivity(0)" />-->
        <!--          <lfx-icon-switch2-off v-else @click.native="setReferralsActivity(1)" />-->
        <!--        </div>-->
      </div>
    </div>
    <div class="partners-campaigns-table">
      <div v-if="referrals && referrals.length" class="partners-campaigns-table-head  -campaign">
        <span
          class="partners-campaigns-table-head-title-uid"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="'Uid'"
        />
        <span
          v-if="tableColumns.includes('activity')"
          class="partners-campaigns-table-head-title-activity -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Активность')"
        />
        <span
          v-if="tableColumns.includes('registration')"
          class="partners-campaigns-table-head-title-registration -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Регистрация')"
        />
        <span
          v-if="tableColumns.includes('country')"
          class="partners-campaigns-table-head-title-country -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Страна')"
        />
        <span
          v-if="tableColumns.includes('nickname')"
          class="partners-campaigns-table-head-title-nickname -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Никнейм')"
        />
        <span
          v-if="tableColumns.includes('deposit')"
          class="partners-campaigns-table-head-title-deposit -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Пополнение')"
        />
        <span
          v-if="tableColumns.includes('withdrawal')"
          class="partners-campaigns-table-head-title-withdrawal -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Вывод')"
        />
        <span
          v-if="tableColumns.includes('commission')"
          class="partners-campaigns-table-head-title-commission -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Комиссия')"
        />
      </div>
      <div v-if="referrals && referrals.length" class="partners-campaigns-table-rows">
        <div v-for="referral in referrals" :key="referral.id" class="partners-campaigns-table-rows-row  -campaign">
          <template v-if="windowWidthNumber >= 1223">
            <bdi
              class="partners-campaigns-table-rows-row-uid"
              :class="isRtlMode ? 'text-right' : ''"
              @click="openCurrentReferral(referral)"
              v-text="referral.username"
            />
            <bdi
              v-if="tableColumns.includes('activity')"
              class="partners-campaigns-table-rows-row-activity"
              :class="[Number(referral.activity) ? '-active' : '-not_active', isRtlMode ? 'text-right' : '']"
              v-text="Number(referral.activity) ? $t('Активен') : $t('Не активен')"
            />
            <bdi
              v-if="tableColumns.includes('registration')"
              class="partners-campaigns-table-rows-row-registration"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="moment(referral.reg_date).format('DD.MM.YYYY')"
            />
            <bdi
              v-if="tableColumns.includes('country')"
              class="partners-campaigns-table-rows-row-country"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="referral.country"
            />
            <bdi
              v-if="tableColumns.includes('nickname')"
              class="partners-campaigns-table-rows-row-nickname"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="referral.username"
            />
            <bdi
              v-if="tableColumns.includes('deposit')"
              class="partners-campaigns-table-rows-row-deposit"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(referral.deposit).toFixed(2)} USD`"
            />
            <bdi
              v-if="tableColumns.includes('withdrawal')"
              class="partners-campaigns-table-rows-row-withdrawal"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(referral.withdrawal).toFixed(2)} USD`"
            />
            <bdi
              v-if="tableColumns.includes('commission')"
              class="partners-campaigns-table-rows-row-commission"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(referral.commission).toFixed(2)} USD`"
            />
          </template>
          <template v-else>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-uid text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="'Uid'"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-uid"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="referral.username"
                />
              </div>
              <div v-if="tableColumns.includes('activity')" class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-activity text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Активность')"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-activity"
                  :class="[Number(referral.activity) ? '-active' : '-not_active', isRtlMode ? 'text-right' : '']"
                  v-text="Number(referral.activity) ? $t('Активен') : $t('Не активен')"
                />
              </div>
              <div v-if="tableColumns.includes('registration')" class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-registration text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Регистрация')"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-registration"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="moment(referral.reg_date).format('DD.MM.YYYY')"
                />
              </div>
              <div v-if="tableColumns.includes('country')" class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-country text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Страна')"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-country"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="referral.country"
                />
              </div>
              <div v-if="tableColumns.includes('nickname')" class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-country text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Никнейм')"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-country"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="referral.username"
                />
              </div>
              <div class="partners-campaigns-table-grid_rows">
                <div v-if="tableColumns.includes('withdrawal')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-withdrawal text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Пополнение')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-withdrawal"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${Number(referral.withdrawal).toFixed(2)} USD`"
                  />
                </div>
                <div v-if="tableColumns.includes('deposit')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-deposit text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Регистрации')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-deposit"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${Number(referral.deposit).toFixed(2)} USD`"
                  />
                </div>
                <div v-if="tableColumns.includes('commission')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-commission text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Комиссия')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-commission"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${Number(referral.commission).toFixed(2)} USD`"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-else class="partners-campaigns-table-rows">
        <div class="partners-campaigns-table-rows-row -empty" v-text="$t(referralsEmptyDataTitle)" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AirDatepicker from 'air-datepicker'
import localeAr from 'air-datepicker/locale/ar'
import localeCs from 'air-datepicker/locale/cs'
import localeDa from 'air-datepicker/locale/da'
import localeDe from 'air-datepicker/locale/de'
import localeEn from 'air-datepicker/locale/en'
import localeEs from 'air-datepicker/locale/es'
import localeFi from 'air-datepicker/locale/fi'
import localeFr from 'air-datepicker/locale/fr'
import localeHu from 'air-datepicker/locale/hu'
import localeIt from 'air-datepicker/locale/it'
import localeJa from 'air-datepicker/locale/ja'
import localeKo from 'air-datepicker/locale/ko'
import localeNl from 'air-datepicker/locale/nl'
import localePl from 'air-datepicker/locale/pl'
import localePt from 'air-datepicker/locale/pt'
import localeRo from 'air-datepicker/locale/ro'
import localeRu from 'air-datepicker/locale/ru'
import localeSi from 'air-datepicker/locale/si'
import localeSk from 'air-datepicker/locale/sk'
import localeSv from 'air-datepicker/locale/sv'
import localeTh from 'air-datepicker/locale/th'
import localeTr from 'air-datepicker/locale/tr'
import localeUk from 'air-datepicker/locale/uk'
import localeZh from 'air-datepicker/locale/zh'

import LfxIconSettings2 from '~/components/icons/lfx-icon-settings-2'
export default {
  name: 'AffiliateCampaignsNetwork',
  components: {
    LfxIconSettings2
  },
  data () {
    return {
      moment,
      activity: 0,
      locale: {
        ar: localeAr,
        cs: localeCs,
        da: localeDa,
        de: localeDe,
        en: localeEn,
        es: localeEs,
        fi: localeFi,
        fr: localeFr,
        hu: localeHu,
        it: localeIt,
        ja: localeJa,
        ko: localeKo,
        nl: localeNl,
        pl: localePl,
        pt: localePt,
        ro: localeRo,
        ru: localeRu,
        si: localeSi,
        sk: localeSk,
        sv: localeSv,
        th: localeTh,
        tr: localeTr,
        uk: localeUk,
        zh: localeZh
      }
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Реферальная сеть')} | ${this.$t('Кампании')}`)
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    },
    referralsEmptyDataTitle () {
      return this.$store.getters['partners/getters/handler/getReferralsEmptyDataTitle']
    },
    tableColumns () {
      return this.$store.getters['partners/getters/handler/getPartnerReferralTableSettings']
    },
    referralsData () {
      return this.$store.getters['partners/getters/handler/getPartnerNetwork'].total
    },
    referrals () {
      const result = this.$store.getters['partners/getters/handler/getPartnerNetwork'].list
      const columns = this.$store.getters['partners/getters/handler/getPartnerNetwork'].columns
      return result && result.length && columns && columns.length
        ? result.map((item) => {
          return item.reduce((acc, value, index) => {
            acc[columns[index]] = value
            return acc
          }, {})
        })
        : []
    }
  },
  mounted () {
    this.renderDatepicker()
  },
  created () {
    this.activity = localStorage.getItem('affiliate_activity') ? Number(localStorage.getItem('affiliate_activity')) : 0
    this.$store.dispatch('partners/actions/handler/fetchPartnerNetwork', { activity: this.activity, ...this.affiliateDates })
  },
  methods: {
    setReferralsActivity (value) {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      localStorage.setItem('affiliate_activity', value)
      this.activity = value
      this.$store.dispatch('partners/actions/handler/fetchPartnerNetwork', { activity: this.activity, dateFrom, dateTo })
    },
    openCurrentReferral (referral) {
      this.$store.commit('partners/mutations/handler/SAVE_CURRENT_REFERRAL', {
        rootData: this.$store.state.partners.state.handler,
        data: referral
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-current-referral')
    },
    renderDatepicker () {
      const moment = this.moment
      const affiliateDates = this.affiliateDates
      const store = this.$store
      const render = () => new AirDatepicker('#air-datepicker', {
        range: true,
        multipleDatesSeparator: ' - ',
        position: 'bottom right',
        locale: this.locale[this.$store.getters['dictionaries/getters/handler/getRoutePages'].locale] || localeEn,
        selectedDates: [affiliateDates.dateFrom, affiliateDates.dateTo],
        onSelect (payload) {
          const dateFrom = moment(payload.date[0]).format('YYYY-MM-DD')
          const dateTo = moment(payload.date[1]).format('YYYY-MM-DD')
          const activity = localStorage.getItem('affiliate_activity') ? Number(localStorage.getItem('affiliate_activity')) : 0
          store.commit('partners/mutations/handler/SAVE_CAMPAIGN_FILTER', {
            rootData: store.state.partners.state.handler,
            data: { dateFrom, dateTo }
          })
          localStorage.setItem('affiliate_from', dateFrom)
          localStorage.setItem('affiliate_to', dateTo)
          store.dispatch('partners/actions/handler/fetchPartnerNetwork', { activity, dateFrom, dateTo })
        }
      })
      render()
    }
  }
}
</script>
