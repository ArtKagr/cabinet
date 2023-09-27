<template>
  <div class="d-flex flex-column bg-white px-3 pt-3 pb-4 border-light-secondary">
    <span class="text-dark-primary-15 mb-3" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Торговые сессии')" />
    <div class="d-flex flex-column">
      <div v-for="(day, key) in changedWeek" :key="key" class="d-flex flex-column mb-2">
        <div class="d-flex align-items-center justify-content-between">
          <span class="text-secondary-12" v-text="day.title" />
          <div class="d-flex align-items-center">
            <div v-if="day.from && day.to" class="d-flex align-items-center justify-content-between">
              <span class="text-dark-primary-12" v-text="day.from" />
              <span class="text-dark-primary-12 ml-1 mr-1" v-text="'-'" />
              <span class="text-dark-primary-12" v-text="day.to" />
            </div>
            <span v-else class="text-dark-primary-12 text-capitalize" v-text="$t('нет торговли')" />
            <div v-if="day.from1 && day.to1" class="d-flex align-items-center justify-content-between ml-1">
              <span class="text-dark-primary-12" v-text="`| ${day.from1}`" />
              <span class="text-dark-primary-12 ml-1 mr-1" v-text="'-'" />
              <span class="text-dark-primary-12" v-text="day.to1" />
            </div>
          </div>
        </div>
        <div class="add_info-work_hours">
          <div
            v-for="hour in workHours"
            :key="hour"
            class="add_info-work_hours-work_hour"
            :class="getActiveHour(day, hour)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Schedule',
  props: {
    instrument: {
      type: Object,
      default: () => {
        return {
          symbol: null,
          symbol_original: true,
          category: 1
        }
      }
    }
  },
  data () {
    return {
      moment,
      workHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    week () {
      return [
        { day: 1, title: this.$t('Понедельник'), index: 1 },
        { day: 2, title: this.$t('Вторник'), index: 2 },
        { day: 3, title: this.$t('Среда'), index: 3 },
        { day: 4, title: this.$t('Четверг'), index: 4 },
        { day: 5, title: this.$t('Пятница'), index: 5 },
        { day: 6, title: this.$t('Суббота'), index: 6 },
        { day: 7, title: this.$t('Воскресенье'), index: 0 }
      ]
    },
    changedWeek () {
      const result = this.week.reduce((preVal, day) => {
        const dayIndex = day.index
        const dayTitle = day.title
        const schedule = this.instrument.session[dayIndex]
        const result = { title: dayTitle, from: null, to: null, fromHm: null, toHm: null }
        result.fromHm = schedule && schedule.length ? { h: this.getTime(Math.floor(schedule[0][0] / 60)), m: this.getTime(schedule[0][0] % 60), hh: Math.floor(schedule[0][0] / 60), mm: schedule[0][0] % 60 } : null
        result.from = result.fromHm ? `${result.fromHm.h}:${result.fromHm.m}` : null
        result.toHm = schedule && schedule.length ? { h: this.getTime(Math.floor(schedule[0][1] / 60)), m: this.getTime(schedule[0][1] % 60), hh: Math.floor(schedule[0][1] / 60), mm: schedule[0][1] % 60 } : null
        result.to = result.toHm ? `${result.toHm.h}:${result.toHm.m}` : null
        //
        result.fromHm1 = schedule && schedule.length && schedule.length > 1 ? { h: this.getTime(Math.floor(schedule[1][0] / 60)), m: this.getTime(schedule[1][0] % 60), hh: Math.floor(schedule[1][0] / 60), mm: schedule[1][0] % 60 } : null
        result.from1 = result.fromHm1 ? `${result.fromHm1.h}:${result.fromHm1.m}` : null
        result.toHm1 = schedule && schedule.length && schedule.length > 1 ? { h: this.getTime(Math.floor(schedule[1][1] / 60)), m: this.getTime(schedule[1][1] % 60), hh: Math.floor(schedule[1][1] / 60), mm: schedule[1][1] % 60 } : null
        result.to1 = result.toHm1 ? `${result.toHm1.h}:${result.toHm1.m}` : null
        preVal.push(result)
        return preVal
      }, [])
      console.warn('result', result)
      return result
    },
    quote () {
      return this.$store.getters['trading/getters/trading/getCurrentQuote']({ server: this.account.server, symbol: this.instrument.symbol })
    },
    currentQuote () {
      if (this.quote && this.quote.length && this.quote[1] && this.quote[2] && this.instrument && this.instrument.digits) {
        return [
          this.quote[0],
          this.quote[1].toFixed(this.instrument.digits),
          this.quote[2].toFixed(this.instrument.digits)
        ]
      } else {
        return [null, 0, 0]
      }
    },
    activeInstrument () {
      return this.$store.getters['trading/getters/trading/getActiveInstruments'][this.instrument.symbol] || {}
    },
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    getTime (value) {
      let result
      switch (value) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          result = `0${value}`
          break
        default:
          result = value
      }
      return result
    },
    getActiveHour (day, hour) {
      const first = day.from && day.fromHm && (day.fromHm.hh || day.fromHm.hh === 0) && day.fromHm.hh <= hour && day.toHm.hh >= hour
      const second = day.from && day.fromHm1 && (day.fromHm1.hh || day.fromHm1.hh === 0) && day.fromHm1.hh < hour && day.toHm1.hh >= hour
      return first || second ? '-active' : ''
    }
  }
}
</script>
