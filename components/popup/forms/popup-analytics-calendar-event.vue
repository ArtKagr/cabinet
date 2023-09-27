<template>
  <div class="popup-analytics-calendar_event">
    <div class="popup-analytics-calendar_event-indent" />
    <div class="popup-analytics-calendar_event-head" :class="`-${dir}`">
      <span class="popup-analytics-calendar_event-head-time" :class="`-${dir}`" v-text="event.date_time" />
      <div class="popup-analytics-calendar_event-head-priority" :class="`-${dir}`">
        <lfx-calendar-priority :priority="event.priority" />
      </div>
      <div class="popup-analytics-calendar_event-head-country">
        <lfx-symbol-country class="popup-analytics-calendar_event-head-country-symbol" :class="`-${dir}`" :symbol="event.country" />
        <span class="popup-analytics-calendar_event-head-country-name" :class="`-${dir}`" v-text="event.country" />
      </div>
    </div>
    <span class="popup-analytics-calendar_event-title" :class="`-${dir}`" v-text="event.title" />
    <div class="popup-analytics-calendar_event-menu" :class="`-${dir}`">
      <span
        class="popup-analytics-calendar_event-menu-item"
        :class="{ '-active': activeTab === 'description', '-rtl': dir === 'rtl', '-ltr': dir === 'ltr' }"
        @click="setActiveTab('description')"
        v-text="$t('Описание')"
      />
      <span
        v-if="event.lastEvents"
        class="popup-analytics-calendar_event-menu-item"
        :class="{ '-active': activeTab === 'table', '-rtl': dir === 'rtl', '-ltr': dir === 'ltr' }"
        @click="setActiveTab('table')"
        v-text="$t('Таблица')"
      />
      <span
        v-if="event.chartData"
        class="popup-analytics-calendar_event-menu-item"
        :class="{ '-active': activeTab === 'chart', '-rtl': dir === 'rtl', '-ltr': dir === 'ltr' }"
        @click="setActiveTab('chart')"
        v-text="$t('График')"
      />
    </div>
    <div class="popup-analytics-calendar_event-content">
      <span
        v-if="activeTab === 'description'"
        class="popup-analytics-calendar_event-content-description"
        :class="`-${dir}`"
        v-text="event.description"
      />
      <div
        v-else-if="activeTab === 'table'"
        class="popup-analytics-calendar_event-content-table"
      >
        <div class="popup-analytics-calendar_event-content-table-row -head">
          <div class="popup-analytics-calendar_event-content-table-row-column -head" :class="`-${dir}`">
            <span class="popup-analytics-calendar_event-content-table-row-column-value -head" v-text="$t('Дата')" />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column -head" :class="`-${dir}`">
            <span class="popup-analytics-calendar_event-content-table-row-column-value -head" v-text="$t('Предыдущий')" />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column -head" :class="`-${dir}`">
            <span class="popup-analytics-calendar_event-content-table-row-column-value -head -forecast" v-text="$t('Прогноз')" />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column -head" :class="`-${dir}`">
            <span class="popup-analytics-calendar_event-content-table-row-column-value -head -actual" v-text="$t('Актуальный')" />
          </div>
        </div>
        <div v-for="(item, elem) in event.lastEvents" :key="elem" class="popup-analytics-calendar_event-content-table-row">
          <div class="popup-analytics-calendar_event-content-table-row-column" :class="`-${dir}`">
            <span
              class="popup-analytics-calendar_event-content-table-row-column-value"
              v-text="moment(item.time_value).format('DD.MM.YYYY')"
            />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column" :class="`-${dir}`">
            <span
              class="popup-analytics-calendar_event-content-table-row-column-value"
              v-text="item.previous_value"
            />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column" :class="`-${dir}`">
            <span
              class="popup-analytics-calendar_event-content-table-row-column-value -forecast"
              v-text="item.forecast_value ? item.forecast_value : ''"
            />
          </div>
          <div class="popup-analytics-calendar_event-content-table-row-column" :class="`-${dir}`">
            <span
              class="popup-analytics-calendar_event-content-table-row-column-value -actual"
              v-text="item.actual_value"
            />
          </div>
        </div>
      </div>
      <div
        v-else-if="activeTab === 'chart'"
        class="popup-analytics-calendar_event-content-chart"
      >
        <highcharts class="partners-campaigns-chart-container" :options="chartOptions(event.chartData)" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Chart } from 'highcharts-vue'
import LfxCalendarPriority from '~/components/_aux/lfx-calendar-priority'
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
export default {
  name: 'PopupAnalyticsCalendarEvent',
  components: {
    LfxSymbolCountry,
    LfxCalendarPriority,
    highcharts: Chart
  },
  data () {
    return {
      moment,
      activeTab: 'description'
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    event () {
      return this.$store.getters['analytics/getters/handler/getCurrentCalendarEvent']
    },
    countriesList () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCountriesList']
    }
  },
  destroyed () {
    this.$store.commit('analytics/mutations/handler/SAVE_CURRENT_EVENT_ANALYTICS_CALENDAR', {
      rootData: this.$store.state.analytics.state.handler,
      data: {}
    })
  },
  methods: {
    getCountryTitle (symbol) {
      const result = this.countriesList.find(country => country[0] === symbol)
      return result && result.length ? result[1] : null
    },
    setActiveTab (activeTab) {
      this.activeTab = activeTab
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
<style lang="scss">
  .popup-analytics-calendar_event {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-indent {
      width: 100%;
      height: 40px;
    }

    &-head {
      display: flex;
      align-items: center;
      padding: 0 10px;

      &-time {
        font-size: 13px;
        color: #3B4B68;
        width: 50px;
        padding: 5px;

        &.-rtl {
          text-align: right;
        }
      }

      &-priority {
        display: flex;
        width: 50px;
        padding: 5px;

        &.-rtl {
          justify-content: flex-start;
        }
      }

      &-country {
        display: flex;
        align-items: center;

        &-symbol {

          &.-ltr {
            margin-right: 5px;
          }

          &.-rtl {
            margin-left: 5px;
          }
        }

        &-name {
          font-size: 13px;
          color: #3B4B68;
        }
      }
    }

    &-title {
      font-size: 15px;
      color: #3B4B68;
      line-height: 1.4;
      padding: 5px 10px;

      &.-rtl {
        text-align: right;
      }
    }

    &-menu {
      display: flex;
      align-items: center;
      padding: 5px;

      &-item {
        padding: 5px;
        font-size: 14px;
        color: #3498db;
        font-weight: 500;
        cursor: pointer;

        &.-active {
          color: #3B4B68;
        }

        &.-ltr {
          margin-right: 20px;
        }

        &.-rtl {
          margin-left: 20px;
        }
      }
    }

    &-content {
      display: flex;
      width: 100%;

      &-description {
        font-size: 14px;
        color: #3B4B68;
        padding: 15px 10px 0;

        &.-rtl {
          text-align: right;
        }
      }

      &-table {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;

        &-row {
          display: flex;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #e8ebef;

          &.-head {
            background-color: #eaeced;
            border-bottom: none;
          }

          &-column {
            display: flex;
            padding: 10px 5px 10px 15px;
            width: 25%;

            &.-rtl {
              padding: 10px 15px 10px 5px;
            }

            &.-head {

            }

            &-value {
              font-size: 13px;
              color: #8d8d8d;

              &.-head {
                font-size: 10px;
              }

              &.-forecast {
                color: #ee7a25;
              }

              &.-actual {
                color: #3B4B68;
                font-weight: 500;
              }
            }
          }
        }
      }

      &-chart {
        display: flex;
        width: 100%;
      }
    }
  }
</style>
