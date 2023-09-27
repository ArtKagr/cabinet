<template>
  <div class="d-flex flex-column" :style="windowWidthNumber > 1200 ? 'max-width: 85%' : 'max-width: 100%'">
    <div
      class="d-flex align-items-center justify-content-between w-100"
      :class="[isRtlMode ? 'pl-4' : 'pr-4', windowWidthNumber < 768 ? 'mt-2' : '']"
    >
      <lfx-menu
        v-if="windowWidthNumber > 768"
        :menu="menu"
        :active-item="activeItem"
        source="analytics-signals"
        no-route
        static-menu
        @click-handler="clickHandler"
      />
      <lfx-filter-select
        v-else
        :title="$t('Период')"
        :items="menu"
        :active-flag="activeItem"
        :width="180"
        class="mx-4 mb-2"
        @click-handler="clickHandler"
      />
      <b-button variant="outline-secondary" @click="showPopup('analytics-calendar-filter')">
        <lfx-icon-filter class="icon-secondary" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
        <span v-text="$t('Фильтр')" />
      </b-button>
    </div>
    <div class="d-flex w-100 px-4 pb-4">
      <div v-if="windowWidthNumber > 1000" class="d-flex flex-column border-light-secondary w-100">
        <div class="d-flex align-items-center py-1 px-3 w-100">
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Время выхода')" />
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('До новости')" />
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Приоритет')" />
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Страна')" />
          <span class="text-secondary-10 w-30" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Событие')" />
          <span class="w-10" style="color: #EE7125; font-size: 10px;" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Предыдущий')" />
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Прогноз')" />
          <span class="text-secondary-10 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Актуальный')" />
        </div>
        <div v-for="(date, key) in analyticsCalendar" :key="key" class="d-flex flex-column w-100">
          <span
            class="text-dark-primary-15 w-100 font-weight-500 border-bottom-light-secondary"
            :class="isRtlMode ? 'text-right' : ''"
            style="padding: 10px 15px; background-color: #f4f6f9;"
            v-text="key"
          />
          <div v-for="event in date" :key="event.id" class="d-flex flex-column">
            <div
              class="d-flex align-items-center p-3 w-100 pointer user-select-none"
              :class="event.is_shown ? '' : 'border-bottom-light-secondary'"
              :style="event.is_shown ? 'background-color: #f4f6f9' : 'background-color: white'"
              @click="toggleEventDescription(event)"
            >
              <span class="text-dark-primary-13 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="event.date_time" />
              <div class="w-10" :style="event.before_news ? '' : 'width: 113px; height: 19px;'">
                <span class="text-dark-primary-13" :class="isRtlMode ? 'text-right' : ''" v-text="event.before_news" />
              </div>
              <div class="w-10" :class="isRtlMode ? 'd-flex justify-content-end' : ''">
                <lfx-calendar-priority :priority="event.priority" />
              </div>
              <div class="d-flex align-items-center w-20">
                <lfx-symbol-country :symbol="event.country" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
                <span class="text-dark-primary-13" v-text="getCountryTitle(event.country)" />
              </div>
              <span class="text-dark-primary-13 w-30" :class="isRtlMode ? 'text-right' : ''" v-text="event.title" />
              <span class="text-secondary-13 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="event.previous || ''" />
              <span class="w-10" style="color: #EE7125; font-size: 13px;" :class="isRtlMode ? 'text-right' : ''" v-text="event.forecast || ''" />
              <span class="text-black-13 w-10" :class="isRtlMode ? 'text-right' : ''" v-text="event.actual || ''" />
            </div>
            <div v-if="event.is_shown" class="d-flex flex-column border-bottom-light-secondary" style="padding: 0 15px; background-color: #f4f6f9;">
              <div class="d-flex align-items-center mb-3">
                <span
                  class="pointer"
                  :class="[isRtlMode ? 'ml-4' : 'mr-4', event.activeTab === 'description' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500']"
                  @click="setActiveTab('description', event.id)"
                  v-text="$t('Описание')"
                />
                <span
                  v-if="event.lastEvents"
                  class="pointer"
                  :class="[isRtlMode ? 'ml-4' : 'mr-4', event.activeTab === 'table' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500']"
                  @click="setActiveTab('table', event.id)"
                  v-text="$t('Таблица')"
                />
                <span
                  v-if="event.chartData"
                  class="pointer"
                  :class="event.activeTab === 'chart' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500'"
                  @click="setActiveTab('chart', event.id)"
                  v-text="$t('График')"
                />
              </div>
              <span v-if="event.activeTab === 'description'" class="text-dark-primary-14 mb-3" :class="isRtlMode ? 'text-right' : ''" v-text="event.description" />
              <div v-else-if="event.activeTab === 'table'" class="d-flex flex-column">
                <div class="d-flex justify-content-center align-items-center mx-auto" :style="`background-color: #eaeced; transform: translateX(${isRtlMode ? '15px' : '-15px'}); width: calc(100% + 30px);`">
                  <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Дата')" />
                  </div>
                  <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #8d8d8d;" v-text="$t('Предыдущий')" />
                  </div>
                  <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #ee7125;" v-text="$t('Прогноз')" />
                  </div>
                  <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px;">
                    <span class="text-dark-primary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px;" v-text="$t('Актуальный')" />
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center w-100 mx-auto">
                  <div v-for="(item, elem) in event.lastEvents" :key="elem" class="d-flex">
                    <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="moment(item.time_value).format('DD.MM.YYYY')" />
                    </div>
                    <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #8d8d8d;" v-text="item.previous_value" />
                    </div>
                    <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #ee7125;" v-text="item.forecast_value ? item.forecast_value : ''" />
                    </div>
                    <div class="d-flex" style="width: 160px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-dark-primary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px;" v-text="item.actual_value" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="event.activeTab === 'chart'">
                <highcharts class="partners-campaigns-chart-container" :options="chartOptions(event.chartData)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex flex-column w-100">
        <div v-for="(date, key) in analyticsCalendar" :key="key" class="d-flex flex-column w-100">
          <span
            class="text-dark-primary-15 w-100 font-weight-500"
            :class="isRtlMode ? 'text-right' : ''"
            style="padding: 10px"
            v-text="key"
          />
          <div v-for="event in date" :key="event.id" class="d-flex flex-column mb-2">
            <div
              class="d-flex flex-column py-4 px-3 w-100 pointer user-select-none"
              :class="event.is_shown && windowWidthNumber > 768 ? '' : 'border-bottom-light-secondary'"
              :style="event.is_shown && windowWidthNumber > 768 ? 'background-color: #f4f6f9' : 'background-color: white'"
              @click="toggleEventDescription(event, key)"
            >
              <div class="d-flex align-items-center mb-1">
                <span style="width: 50px;" class="text-dark-primary-13" :class="isRtlMode ? 'text-right' : ''" v-text="event.date_time" />
                <lfx-calendar-priority style="width: 50px;" :class="isRtlMode ? 'd-flex justify-content-end' : ''" :priority="event.priority" />
                <div class="d-flex align-items-center">
                  <lfx-symbol-country :symbol="event.country" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
                  <span class="text-dark-primary-13" v-text="getCountryTitle(event.country)" />
                </div>
              </div>
              <span class="text-dark-primary-13 mb-2" :class="isRtlMode ? 'text-right' : ''" v-text="event.title" />
              <div class="d-flex align-items-center">
                <div style="width: 33.33%;" class="d-flex flex-column">
                  <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Предыдущий')" />
                  <span class="text-secondary-18" :class="isRtlMode ? 'text-right' : ''" v-text="event.previous || ''" />
                </div>
                <div style="width: 33.33%;" class="d-flex flex-column">
                  <span class="text-uppercase" :class="isRtlMode ? 'text-right' : ''" style="color: #EE7125; font-size: 10px;" v-text="$t('Прогноз')" />
                  <span :class="isRtlMode ? 'text-right' : ''" style="color: #EE7125; font-size: 18px;" v-text="event.forecast || ''" />
                </div>
                <div style="width: 33.33%;" class="d-flex flex-column">
                  <span class="text-uppercase" :class="isRtlMode ? 'text-right' : ''" style="color: black; font-size: 10px;" v-text="$t('Актуальный')" />
                  <span class="text-black-18" :class="isRtlMode ? 'text-right' : ''" v-text="event.actual || ''" />
                </div>
              </div>
            </div>
            <div v-if="event.is_shown && windowWidthNumber > 768" class="d-flex flex-column border-bottom-light-secondary" style="padding: 0 15px; background-color: #f4f6f9;">
              <div class="d-flex align-items-center mb-3">
                <span
                  class="pointer"
                  :class="[isRtlMode ? 'ml-4' : 'mr-4', event.activeTab === 'description' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500']"
                  @click="setActiveTab('description', event.id)"
                  v-text="$t('Описание')"
                />
                <span
                  v-if="event.lastEvents"
                  class="pointer"
                  :class="[isRtlMode ? 'ml-4' : 'mr-4', event.activeTab === 'table' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500']"
                  @click="setActiveTab('table', event.id)"
                  v-text="$t('Таблица')"
                />
                <span
                  v-if="event.chartData"
                  class="pointer"
                  :class="event.activeTab === 'chart' ? 'text-dark-primary-14 font-weight-600' : 'text-primary-14 font-weight-500'"
                  @click="setActiveTab('chart', event.id)"
                  v-text="$t('График')"
                />
              </div>
              <span v-if="event.activeTab === 'description'" class="text-dark-primary-14 mb-3" :class="isRtlMode ? 'text-right' : ''" v-text="event.description" />
              <div v-else-if="event.activeTab === 'table' && windowWidthNumber < 1000 && windowWidthNumber > 767" class="d-flex flex-column">
                <div class="d-flex justify-content-center align-items-center mx-auto" :style="`background-color: #eaeced; transform: translateX(${isRtlMode ? '15px' : '-15px'}); width: calc(100% + 30px);`">
                  <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Дата')" />
                  </div>
                  <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #8d8d8d;" v-text="$t('Предыдущий')" />
                  </div>
                  <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px;">
                    <span class="text-secondary-10 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 160px; color: #ee7125;" v-text="$t('Прогноз')" />
                  </div>
                  <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px;">
                    <span class="text-dark-primary-10 line-height-1" style="width: 160px;" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Актуальный')" />
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center w-100 mx-auto">
                  <div v-for="(item, elem) in event.lastEvents" :key="elem" class="d-flex">
                    <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="moment(item.time_value).format('DD.MM.YYYY')" />
                    </div>
                    <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 150px; color: #8d8d8d;" v-text="item.previous_value" />
                    </div>
                    <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-secondary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 150px; color: #ee7125;" v-text="item.forecast_value ? item.forecast_value : ''" />
                    </div>
                    <div class="d-flex" style="width: 150px; padding: 10px 5px 10px 15px; border-bottom: 1px solid #e8ebef;">
                      <span class="text-dark-primary-13 line-height-1" :class="isRtlMode ? 'text-right' : ''" style="width: 150px;" v-text="item.actual_value" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="event.activeTab === 'chart'">
                <highcharts class="partners-campaigns-chart-container" :options="chartOptions(event.chartData)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import LfxMenu from '~/components/_aux/lfx-menu'
import LfxIconFilter from '~/components/icons/lfx-icon-filter'
import LfxCalendarPriority from '~/components/_aux/lfx-calendar-priority'
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
import LfxFilterSelect from '~/components/_aux/lfx-filter-select.vue'
export default {
  name: 'AnalyticsCalendar',
  components: {
    LfxFilterSelect,
    LfxSymbolCountry,
    LfxCalendarPriority,
    LfxIconFilter,
    LfxMenu,
    highcharts: Chart
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
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    menu () {
      // Меню страницы "Аналитика/Календарь"
      return [
        { title: this.$t('Вчера'), route: null, flag: 'yesterday' },
        { title: this.$t('Сегодня'), route: null, flag: 'today' },
        { title: this.$t('Завтра'), route: null, flag: 'tomorrow' },
        { title: this.$t('На этой неделе'), route: null, flag: 'week' },
        { title: this.$t('Следующая неделя'), route: null, flag: 'next_week' }
      ]
    },
    analyticsCalendar () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCalendar']
    },
    analyticsCalendarPage () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCalendarPage']
    },
    activeItem () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsActiveCalendarPeriod']
    },
    activeTimeZone () {
      return this.$store.getters['analytics/getters/handler/getActiveTimeZone']
    },
    countriesList () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCountriesList']
    },
    sortingStyle () {
      return {
        padding: '4px'
      }
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    }
  },
  watch: {
    activeItem () {
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar')
    },
    activeTimeZone () {
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar')
    },
    scrollBottom (newValue) {
      if (newValue === 0) {
        this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar', this.analyticsCalendarPage + 1)
      }
    }
  },
  created () {
    this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar')
    const calendarPeriod = localStorage.getItem('calendar_period') || 'today'
    if (calendarPeriod === 'today') {
      localStorage.setItem('calendar_period', 'today')
    }
    this.$store.commit('analytics/mutations/handler/SAVE_ACTIVE_CALENDAR_PERIOD', {
      rootData: this.$store.state.analytics.state.handler,
      data: calendarPeriod
    })
  },
  async destroyed () {
    await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', { rootData: this.$store.state.analytics.state.handler, data: { fields: ['priority', 'countries'] } })
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    clickHandler (value) {
      localStorage.setItem('calendar_period', value)
      this.$store.commit('analytics/mutations/handler/SAVE_ACTIVE_CALENDAR_PERIOD', {
        rootData: this.$store.state.analytics.state.handler,
        data: value
      })
    },
    toggleEventDescription (event) {
      if (this.windowWidthNumber > 768) {
        this.$store.commit('analytics/mutations/handler/TOGGLE_CALENDAR_EVENT', {
          rootData: this.$store.state.analytics.state.handler,
          data: event.id
        })
      } else if (this.windowWidthNumber < 768) {
        this.$store.commit('analytics/mutations/handler/SAVE_CURRENT_EVENT_ANALYTICS_CALENDAR', {
          rootData: this.$store.state.analytics.state.handler,
          data: event
        })
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'analytics-calendar-event')
      }
    },
    getCountryTitle (symbol) {
      const result = this.countriesList.find(country => country[0] === symbol)
      return result && result.length ? result[1] : null
    },
    setActiveTab (activeTab, id) {
      this.$store.commit('analytics/mutations/handler/TOGGLE_CALENDAR_EVENT_ACTIVE_TAB', {
        rootData: this.$store.state.analytics.state.handler,
        data: { activeTab, id }
      })
    },
    chartOptions (chartData) {
      return {
        title: { text: '', useHTML: true },
        tooltip: {
          headerFormat: ''
          // formatter () {
          //   const points = this.points.reduce((preVal, point) => {
          //     return preVal + `${point.series.name}: <b>${point.y}</b></br>`
          //   }, '')
          //   return `${chartData.time[this.x]} </br> ${points}</b>`
          // }
        },
        legend: {
          align: 'left',
          verticalAlign: 'top',
          floating: false,
          layout: 'horizontal'
        },
        yAxis: [
          {
            type: 'linear',
            title: '',
            gridLineWidth: '1px',
            gridLineInterpolation: 'polygon',
            labels: {
              format: '{value}',
              style: {
                color: '#666666'
              }
            }
          }
        ],
        xAxis: {
          labels: {
            formatter () {
              return chartData.time[this.value]
            }
          },
          crosshair: {
            snap: false
          },
          gridLineWidth: 0,
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
          name: this.$t('Предыдущий'),
          color: '#8D8D8D',
          type: 'column',
          data: chartData.previous,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        },
        {
          name: this.$t('Прогноз'),
          color: '#EE7125',
          type: 'column',
          data: chartData.forecast,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        },
        {
          name: this.$t('Актуальный'),
          color: '#3B4B68',
          type: 'column',
          data: chartData.actual,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        }]
      }
    }
  }
}
</script>
