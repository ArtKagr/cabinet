<template>
  <div class="partners-campaigns">
    <div class="partners-campaigns-head">
      <span class="partners-campaigns-head-title" v-text="$t('Статистика')" />
      <div class="partners-campaigns-head-filter">
        <input id="air-datepicker">
      </div>
    </div>
    <div class="partners-campaigns-stat">
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="statistics.visits" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Клики')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="statistics.registrations" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Регистрации')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${statistics.conversion}%`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Конверсия')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.deposit || 0).toFixed(2)} USD`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Пополнение')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.withdrawal || 0).toFixed(2)} USD`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Вывод')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.cash_back || 0).toFixed(2)} USD`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="'Cashback'" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.commission || 0).toFixed(2)} USD`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Комиссия')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.commission_sub || 0).toFixed(2)} USD`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Суб-комиссия')" />
      </div>
      <div class="partners-campaigns-stat-item">
        <bdi class="partners-campaigns-stat-item-value" :class="isRtlMode ? 'text-right': ''" v-text="`${Number(statistics.commission_bet || 0)}%`" />
        <span class="partners-campaigns-stat-item-title" :class="isRtlMode ? 'text-right': ''" v-text="$t('Ставка')" />
      </div>
    </div>
    <div class="partners-campaigns-link">
      <div class="d-flex flex-column">
        <span class="partners-campaigns-link-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Скопируйте эту реферальную ссылку, чтобы поделиться')" />
        <span
          class="partners-campaigns-link-text"
          :class="isRtlMode ? 'text-right' : ''"
          @click="openCampaignLink"
          v-text="refLink"
        />
      </div>
      <b-button variant="outline-primary" @click="copyRefLink" v-text="$t('Скопировать')" />
    </div>
    <div class="partners-campaigns-chart">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <span
          class="text-primary-20"
          v-text="`${moment(affiliateDatesSelected.dateFrom || affiliateDates.dateFrom).format('DD.MM.YYYY')} - ${moment(affiliateDatesSelected.dateTo || affiliateDates.dateTo).format('DD.MM.YYYY')}`"
        />
        <div class="d-flex align-items-center">
          <span class="partners-campaigns-chart-menu_item" :class="isRtlMode ? 'ml-4' : 'mr-4'" @click="openExportCommissions" v-text="$t('Детализация')" />
          <span class="partners-campaigns-chart-menu_item" @click="openNetwork" v-text="$t('Реферальная сеть')" />
        </div>
      </div>
      <highcharts class="partners-campaigns-chart-container" :options="chartOptions" />
    </div>
    <div class="partners-campaigns-head -campaigns">
      <div class="flex-container d-flex align-items-center">
        <span class="partners-campaigns-head-title" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="$t('Все кампании')" />
        <b-button class="partners-campaigns-head-button" variant="outline-secondary" @click="fetchForm" v-text="$t('Создать новую кампанию')" />
      </div>
      <div class="d-flex align-items-center pointer" @click="showPopup('partners-table-settings')">
        <lfx-icon-settings2 :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        <span class="text-primary-14" v-text="$t('Настройка таблицы')" />
      </div>
    </div>
    <div class="partners-campaigns-table">
      <div class="partners-campaigns-table-head">
        <span
          class="partners-campaigns-table-head-title-status"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Статус')"
        />
        <span
          class="partners-campaigns-table-head-title-campaign"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Кампания')"
        />
        <span
          class="partners-campaigns-table-head-title-type"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Тип')"
        />
        <span
          v-if="tableColumns.includes('visits')"
          class="partners-campaigns-table-head-title-visits -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Клики')"
        />
        <span
          v-if="tableColumns.includes('registrations')"
          class="partners-campaigns-table-head-title-registrations -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Регистрации')"
        />
        <span
          v-if="tableColumns.includes('conversion')"
          class="partners-campaigns-table-head-title-conversion -primary"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Конверсия')"
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
      <div class="partners-campaigns-table-rows">
        <div v-for="campaign in campaigns" :key="campaign.id" class="partners-campaigns-table-rows-row">
          <template v-if="windowWidthNumber >= 1223">
            <span
              class="partners-campaigns-table-rows-row-status"
              :class="[campaign.status ? '-active' : '-not_active', isRtlMode ? 'text-right' : '']"
              v-text="campaign.status ? $t('Активна') : $t('Не активна')"
            />
            <div class="partners-campaigns-table-rows-row-campaign d-flex align-items-center">
              <span class="line-height-1" :class="isRtlMode ? 'ml-2 text-right' : 'mr-2'" @click="openCurrentCampaign(campaign)" v-text="campaign.campaign" />
              <div v-if="!campaign.type.includes('Default')" @click="editCurrentCampaign(campaign.id)">
                <lfx-icon-edit />
              </div>
            </div>
            <bdi
              class="partners-campaigns-table-rows-row-type"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="campaign.type"
            />
            <bdi
              v-if="tableColumns.includes('visits')"
              class="partners-campaigns-table-rows-row-visits"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="campaign.visits"
            />
            <bdi
              v-if="tableColumns.includes('registrations')"
              class="partners-campaigns-table-rows-row-registrations"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="campaign.registrations"
            />
            <bdi
              v-if="tableColumns.includes('conversion')"
              class="partners-campaigns-table-rows-row-conversion"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${campaign.conversion}%`"
            />
            <bdi
              v-if="tableColumns.includes('deposit')"
              class="partners-campaigns-table-rows-row-deposit"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(campaign.deposit || 0).toFixed(2)} USD`"
            />
            <bdi
              v-if="tableColumns.includes('withdrawal')"
              class="partners-campaigns-table-rows-row-withdrawal"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(campaign.withdrawal || 0).toFixed(2)} USD`"
            />
            <bdi
              v-if="tableColumns.includes('commission')"
              class="partners-campaigns-table-rows-row-commission"
              :class="isRtlMode ? 'text-right' : ''"
              v-text="`${Number(campaign.commission || 0).toFixed(2)} USD`"
            />
          </template>
          <template v-else>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-status text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Статус')"
                />
                <span
                  class="partners-campaigns-table-rows-row-status"
                  :class="[campaign.status ? '-active' : '-not_active', isRtlMode ? 'text-right' : '']"
                  v-text="campaign.status ? $t('Активна') : $t('Не активна')"
                />
              </div>
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-campaign text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Кампания')"
                />
                <div class="partners-campaigns-table-rows-row-campaign d-flex align-items-center">
                  <span class="line-height-1" :class="isRtlMode ? 'ml-2 text-right' : 'mr-2'" @click="openCurrentCampaign(campaign)" v-text="campaign.campaign" />
                  <div v-if="!campaign.type.includes('Default')" @click="editCurrentCampaign(campaign.id)">
                    <lfx-icon-edit />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="partners-campaigns-table-head-title-type text-secondary-10 mb-1"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Тип')"
                />
                <bdi
                  class="partners-campaigns-table-rows-row-type"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="campaign.type"
                />
              </div>
              <div class="partners-campaigns-table-grid_rows">
                <div v-if="tableColumns.includes('visits')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-visits text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Клики')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-visits"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="campaign.visits"
                  />
                </div>
                <div v-if="tableColumns.includes('registrations')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-registrations text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Регистрации')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-registrations"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="campaign.registrations"
                  />
                </div>
                <div v-if="tableColumns.includes('conversion')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-conversion text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Конверсия')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-conversion"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${campaign.conversion}%`"
                  />
                </div>
                <div v-if="tableColumns.includes('deposit')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-deposit text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Пополнение')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-deposit"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${Number(campaign.deposit || 0).toFixed(2)} USD`"
                  />
                </div>
                <div v-if="tableColumns.includes('withdrawal')" class="d-flex flex-column">
                  <span
                    class="partners-campaigns-table-head-title-withdrawal text-secondary-10 mb-1"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="$t('Вывод')"
                  />
                  <bdi
                    class="partners-campaigns-table-rows-row-withdrawal"
                    :class="isRtlMode ? 'text-right' : ''"
                    v-text="`${Number(campaign.withdrawal || 0).toFixed(2)} USD`"
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
                    v-text="`${Number(campaign.commission || 0).toFixed(2)} USD`"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AirDatepicker from 'air-datepicker'
import { Chart } from 'highcharts-vue'
import moment from 'moment'
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
import LfxIconEdit from '~/components/icons/lfx-icon-edit'
import LfxIconSettings2 from '~/components/icons/lfx-icon-settings-2'
export default {
  name: 'AffiliateCampaigns',
  components: {
    LfxIconEdit,
    LfxIconSettings2,
    highcharts: Chart
  },
  data () {
    return {
      moment,
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
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    tableColumns () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaignTableSettings']
    },
    refLink () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].link
    },
    graph () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].graph
    },
    statistics () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].statistics
    },
    campaigns () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].allCampaigns
    },
    affiliateDatesSelected () {
      return this.$store.getters['partners/getters/handler/getAffiliateDates']
    },
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
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
    this.renderDatePicker()
  },
  created () {
    const settings = localStorage.getItem('partner-campaign-table-settings')
    if (settings) {
      this.$store.commit('partners/mutations/handler/SAVE_CAMPAIGN_TABLE_SETTINGS', {
        rootData: this.$store.state.partners.state.handler,
        data: settings
      })
    }
    this.$store.dispatch('partners/actions/handler/fetchPartnerCampaigns', this.affiliateDates)
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
    openNetwork () {
      this.$router.push(`/${this.routePages.locale}/affiliate-campaigns/network`)
    },
    openExportCommissions () {
      this.$router.push(`/${this.routePages.locale}/affiliate-campaigns/export-commissions`)
    },
    editCurrentCampaign (campaignId) {
      localStorage.setItem('campaign_id', campaignId)
      this.$store.dispatch('forms/actions/handler/fetchForm', 'affiliateEditCompany')
    },
    renderDatePicker () {
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
          store.commit('partners/mutations/handler/SAVE_CAMPAIGN_FILTER', {
            rootData: store.state.partners.state.handler,
            data: { dateFrom, dateTo }
          })
          localStorage.setItem('affiliate_from', dateFrom)
          localStorage.setItem('affiliate_to', dateTo)
          store.dispatch('partners/actions/handler/fetchPartnerCampaigns', { dateFrom, dateTo })
        }
      })
      render()
    },
    openCampaignLink () {
      window.open(this.refLink)
    }
  }
}
</script>
