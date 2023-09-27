<template>
  <div class="partners-campaigns">
    <div class="partners-campaigns-head">
      <div class="d-flex align-items-center" :class="windowWidthNumber <= 1223 ? 'w-100 justify-content-between' : ''">
        <span class="partners-campaigns-head-title" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="$t('Статистика кампании')" />
        <b-button
          class="partners-campaigns-head-button"
          variant="outline-secondary"
          @click="openPromoPage"
          v-text="$t('Промо-материалы кампании')"
        />
      </div>
      <div class="partners-campaigns-head-filter">
        <input id="air-datepicker-current">
      </div>
    </div>
    <div class="partners-campaigns-stat">
      <div class="partners-campaigns-stat-item">
        <div class="d-flex align-items-center pb-1 pointer" @click="openCampaignList">
          <span class="partners-campaigns-stat-item-value line-height-1 mb-0 -primary" v-text="currentCampaignData.campaign" />
          <lfx-icon-chevron-down class="partners-promo-campaign-chevron" :class="`-${dir}`" />
        </div>
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Кампания')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="currentCampaignData.type"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Тип')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="statistics.visits"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Клики')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="statistics.registrations"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Регистрации')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${statistics.conversion}%`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Конверсия')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(statistics.deposit || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Пополнение')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(statistics.withdrawal || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Вывод')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="`${Number(statistics.commission || 0).toFixed(2)} USD`"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Комиссия')"
        />
      </div>
      <div class="partners-campaigns-stat-item">
        <span
          class="partners-campaigns-stat-item-value"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="statistics.bet"
        />
        <span
          class="partners-campaigns-stat-item-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Ставка')"
        />
      </div>
    </div>
    <div v-if="user.uid" class="partners-campaigns-link">
      <div class="d-flex flex-column">
        <span
          class="partners-campaigns-link-title"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Скопируйте эту реферальную ссылку, чтобы поделиться')"
        />
        <span
          class="partners-campaigns-link-text"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="refLink"
        />
      </div>
      <b-button variant="outline-primary" @click="copyRefLink" v-text="$t('Скопировать')" />
    </div>
    <div class="partners-campaigns-chart">
      <div class="d-flex align-items-center mb-2">
        <span
          class="text-primary-20"
          v-text="`${moment(affiliateDatesSelected.dateFrom || affiliateDates.dateFrom).format('DD.MM.YYYY')} - ${moment(affiliateDatesSelected.dateTo || affiliateDates.dateTo).format('DD.MM.YYYY')}`"
        />
      </div>
      <highcharts class="partners-campaigns-chart-container" :options="chartOptions" />
    </div>
    <div class="partners-campaigns-head mb-2">
      <span class="partners-campaigns-head-title" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="$t('Рефералы')" />
      <div class="d-flex align-items-center" :class="windowWidthNumber <= 1223 ? 'w-100 justify-content-between' : ''">
        <div class="d-flex align-items-center pointer" :class="isRtlMode ? 'ml-4' : 'mr-4'" @click="showPopup('partners-ref-table-settings')">
          <lfx-icon-settings2 :class="isRtlMode ? 'ml-3' : 'mr-3'" />
          <span class="text-primary-14" v-text="$t('Настройка таблицы')" />
        </div>
        <div class="d-flex align-items-center pointer" :class="isRtlMode ? 'ml-2' : 'mr-2'">
          <span class="text-dark-primary-13" :class="isRtlMode ? 'ml-3' : 'mr-3'" style="color: #6d788a !important;" v-text="$t('Только активные')" />
          <lfx-icon-switch2-on v-if="activity === 1" @click.native="setReferralsActivity(0)" />
          <lfx-icon-switch2-off v-else @click.native="setReferralsActivity(1)" />
        </div>
      </div>
    </div>
    <div class="partners-campaigns-table">
      <div v-if="referrals.length" class="partners-campaigns-table-head  -campaign">
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
      <div v-if="referrals.length" class="partners-campaigns-table-rows">
        <div v-for="referral in referrals" :key="referral.id" class="partners-campaigns-table-rows-row  -campaign">
          <template v-if="windowWidthNumber >= 1223">
            <span
              class="partners-campaigns-table-rows-row-uid"
              :class="isRtlMode ? 'text-right' : ''"
              @click="openCurrentReferral(referral)"
              v-text="referral.client_uid"
            />
            <span
              v-if="tableColumns.includes('activity')"
              class="partners-campaigns-table-rows-row-activity"
              :class="[Number(referral.activity) ? '-active' : '-not_active', isRtlMode ? 'text-right' : '']"
              v-text="Number(referral.activity) ? $t('Активен') : $t('Не активен')"
            />
            <span
              v-if="tableColumns.includes('registration')"
              class="partners-campaigns-table-rows-row-registration"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="moment(referral.reg_date).format('DD.MM.YYYY')"
            />
            <span
              v-if="tableColumns.includes('country')"
              class="partners-campaigns-table-rows-row-country"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="referral.country"
            />
            <span
              v-if="tableColumns.includes('nickname')"
              class="partners-campaigns-table-rows-row-nickname"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="referral.username"
            />
            <span
              v-if="tableColumns.includes('deposit')"
              class="partners-campaigns-table-rows-row-deposit"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(referral.deposit).toFixed(2)} USD`"
            />
            <span
              v-if="tableColumns.includes('withdrawal')"
              class="partners-campaigns-table-rows-row-withdrawal"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(referral.withdrawal).toFixed(2)} USD`"
            />
            <span
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
                <span
                  class="partners-campaigns-table-rows-row-uid"
                  :class="isRtlMode ? 'text-right' : ''"
                  @click="openCurrentReferral(referral)"
                  v-text="referral.client_uid"
                />
              </div>
              <div v-if="tableColumns.includes('activity')" class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-activity text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Активность')"
                />
                <span
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
                <span
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
                <span
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
                <span
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
                  <span
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
                  <span
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
                  <span
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
import { Chart } from 'highcharts-vue'
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
import LfxIconSwitch2Off from '~/components/icons/lfx-icon-switch-2-off'
import LfxIconSwitch2On from '~/components/icons/lfx-icon-switch-2-on'
import LfxIconSettings2 from '~/components/icons/lfx-icon-settings-2'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'AffiliateCampaignsCurrent',
  components: {
    LfxIconChevronDown,
    LfxIconSwitch2Off,
    LfxIconSwitch2On,
    LfxIconSettings2,
    highcharts: Chart
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
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Кампании')}`)
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
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    referralsEmptyDataTitle () {
      return this.$store.getters['partners/getters/handler/getReferralsEmptyDataTitle']
    },
    tableColumns () {
      return this.$store.getters['partners/getters/handler/getPartnerReferralTableSettings']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    refLink () {
      return `${document.location.host}/${this.routePages.locale}/?uid=${this.user.uid}&cid=${this.routePages.current}`
    },
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    },
    currentCampaign () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaign']
    },
    graph () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaign'].graph
    },
    statistics () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaign'].statistics
    },
    referrals () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaignReferrals']
    },
    campaigns () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].allCampaigns
    },
    currentCampaignData () {
      const result = this.campaigns.find(item => item.id === Number(this.routePages.current))
      return result && result.id ? result : { campaign: '', type: '' }
    },
    affiliateDatesSelected () {
      return this.$store.getters['partners/getters/handler/getAffiliateDates']
    },
    campaignList () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaign'].userCampaignList
    },
    chartOptions () {
      return {
        title: { text: '', useHTML: true },
        tooltip: {
          shared: true,
          borderColor: '#f8f8f8'
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          itemMarginBottom: 10
        },
        yAxis: [
          {
            type: 'linear',
            title: '',
            tickAmount: 4,
            gridLineWidth: '1px',
            gridLineInterpolation: 'polygon',
            labels: {
              format: '{value}',
              style: {
                color: '#FF6600'
              }
            }
          },
          {
            type: 'linear',
            title: '',
            tickAmount: 4,
            gridLineWidth: '1px',
            gridLineInterpolation: 'polygon',
            labels: {
              format: '{value}',
              style: {
                color: '#2f7ed8'
              }
            }
          },
          {
            type: 'linear',
            title: '',
            tickAmount: 4,
            gridLineWidth: '1px',
            gridLineInterpolation: 'polygon',
            labels: {
              formatter () {
                return `${this.value} USD`
              },
              style: {
                format: '{value} USD',
                color: '#47a447'
              }
            },
            opposite: true
          }],
        xAxis: {
          labels: {
            formatter () {
              return moment(this.value).format('DD MMM')
            }
          },
          crosshair: {
            snap: false
          },
          gridLineWidth: '1px',
          gridLineInterpolation: 'polygon'
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          name: 'Visits',
          color: '#FF6600',
          fillOpacity: 0,
          lineWidth: 2,
          type: 'spline',
          yAxis: 0,
          data: this.graph.visits,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          tooltip: {
            valueSuffix: '',
            valueDecimals: 0
          },
          gapSize: 5
        },
        {
          name: 'Registrations',
          color: '#2f7ed8',
          fillOpacity: 0,
          lineWidth: 2,
          type: 'spline',
          yAxis: 1,
          data: this.graph.registrations,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          tooltip: {
            valueSuffix: '',
            valueDecimals: 0
          },
          gapSize: 5
        },
        {
          name: 'Commission',
          color: '#47a447',
          fillOpacity: 0,
          lineWidth: 2,
          type: 'spline',
          yAxis: 2,
          data: this.graph.commission,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          tooltip: {
            valueSuffix: ' USD',
            valueDecimals: 2
          },
          gapSize: 5
        }]
      }
    }
  },
  mounted () {
    this.renderDatepicker()
  },
  async created () {
    this.activity = localStorage.getItem('affiliate_activity') ? Number(localStorage.getItem('affiliate_activity')) : 0
    const settings = localStorage.getItem('partner-referral-table-settings')
    if (settings) {
      this.$store.commit('partners/mutations/handler/SAVE_REFERRAL_TABLE_SETTINGS', {
        rootData: this.$store.state.partners.state.handler,
        data: settings
      })
    }
    await this.$store.dispatch('partners/actions/handler/fetchPartnerCampaigns', this.affiliateDates)
    await this.$store.dispatch('partners/actions/handler/fetchCurrentPartnerCampaign', { id: this.routePages.current, ...this.affiliateDates })
    await this.$store.dispatch('partners/actions/handler/fetchCurrentPartnerCampaignReferrals', { id: this.routePages.current, activity: this.activity, ...this.affiliateDates })
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    async fetchForm () {
      await this.$store.dispatch('forms/actions/handler/fetchForm', 'affiliateCreateCompany')
    },
    copyRefLink () {
      navigator.clipboard.writeText(this.refLink)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    },
    openCurrentCampaign (campaign) {
      this.$router.push(`/${this.routePages.locale}/affiliate-campaigns/${campaign.id}`)
    },
    openCurrentReferral (referral) {
      this.$store.commit('partners/mutations/handler/SAVE_CURRENT_REFERRAL', {
        rootData: this.$store.state.partners.state.handler,
        data: referral
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-current-referral')
    },
    setReferralsActivity (value) {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      localStorage.setItem('affiliate_activity', value)
      this.activity = value
      this.$store.dispatch('partners/actions/handler/fetchCurrentPartnerCampaignReferrals', { id: this.routePages.current, activity: this.activity, dateFrom, dateTo })
    },
    openCampaignList () {
      if (this.campaignList && this.campaignList.length) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-campaigns-list')
      }
    },
    openPromoPage () {
      this.$router.push(`/${this.routePages.locale}/affiliate-promo/any/banners`)
      this.$store.commit('partners/mutations/handler/SAVE_PROMO_CID', {
        rootData: this.$store.state.partners.state.handler,
        data: this.routePages.current
      })
    },
    renderDatepicker () {
      const moment = this.moment
      const affiliateDates = this.affiliateDates
      const store = this.$store
      const id = this.routePages.current
      const render = () => new AirDatepicker('#air-datepicker-current', {
        range: true,
        multipleDatesSeparator: ' - ',
        position: 'bottom right',
        locale: this.locale[this.$store.getters['dictionaries/getters/handler/getRoutePages'].locale] || localeEn,
        selectedDates: [affiliateDates.dateFrom, affiliateDates.dateTo],
        onSelect (payload) {
          const dateFrom = moment(payload.date[0]).format('YYYY-MM-DD')
          const dateTo = moment(payload.date[1]).format('YYYY-MM-DD')
          store.commit('partners/mutations/handler/SAVE_CAMPAIGN_FILTER', {
            rootData: store.state.partners.state.handler,
            data: { dateFrom, dateTo }
          })
          localStorage.setItem('affiliate_from', dateFrom)
          localStorage.setItem('affiliate_to', dateTo)
          store.dispatch('partners/actions/handler/fetchCurrentPartnerCampaign', { id, dateFrom, dateTo })
        }
      })
      render()
    }
  }
}
</script>
