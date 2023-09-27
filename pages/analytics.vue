<template>
  <div class="analytics">
    <lfx-menu-links
      :title="$t('Аналитика')"
      :menu="analyticsMenu"
      source="analytics"
      @click-handler="clickHandler"
    >
      <template #button>
        <div class="d-flex align-items-center" :class="isRtlMode ? 'mr-3': 'ml-3'">
          <div class="px-2 bg-white border-light-secondary" style="width: 100px; padding: 1px 0;">
            <lfx-icon-clock class="icon-primary" :class="isRtlMode ? 'ml-1' : 'mr-1'" style="width: 14px; height: 14px; margin-bottom: 1px;" />
            <span v-if="user && user.time_offset" class="text-primary-14" v-text="currentTime" />
            <span v-else class="text-primary-14" v-text="'00:00:00'" />
          </div>
          <lfx-filter-select
            :items="timeZones"
            :active-flag="activeTimeZone"
            :width="90"
            @click-handler="updateActiveItem"
          />
        </div>
      </template>
    </lfx-menu-links>
    <nuxt-child />
  </div>
</template>

<script>
import moment from 'moment'
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
import LfxIconClock from '~/components/icons/lfx-icon-clock'
import LfxFilterSelect from '~/components/_aux/lfx-filter-select.vue'
export default {
  name: 'Analytics',
  components: { LfxFilterSelect, LfxIconClock, LfxMenuLinks },
  data () {
    return {
      moment,
      ctr: 0,
      ivl: 0,
      speed: 1000
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Аналитика')}`)
    }
  },
  computed: {
    timeZones () {
      return this.$store.getters['dictionaries/getters/handler/getTimeZones']
    },
    analyticsMenu () {
      // Меню страницы "Аналитика"
      return [
        { title: this.$t('Аналитическая лента'), route: null, flag: 'analytics' },
        { title: this.$t('Сигналы'), route: 'signals', flag: 'signals' },
        { title: this.$t('Календарь'), route: 'calendar', flag: 'calendar' },
        { title: this.$t('Процентные ставки'), route: 'interest-rates', flag: 'interest_rates' },
        { title: this.$t('Twitter Watcher'), route: 'twitter-watcher', flag: 'twitter_watcher' }
      ]
    },
    sortingStyle () {
      return {
        padding: '2px'
      }
    },
    activeTimeZone () {
      return this.$store.getters['analytics/getters/handler/getActiveTimeZone']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    myVal () {
      if (this.ivl === 0) {
        this.updateTimer()
      }
      return this.ctr
    },
    localGMTSeconds () {
      return new Date().getTimezoneOffset() * 60
    },
    currentUnixTime () {
      return this.user.time_stamp + this.localGMTSeconds + Number(this.activeTimeZone)
    },
    currentTime () {
      return this.moment.unix(this.currentUnixTime).add(this.myVal, 'second').format('HH:mm:ss')
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    activeTimeZone () {
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
    },
    speed () {
      this.updateTimer()
    }
  },
  created () {
    // this.$store.dispatch('dictionaries/actions/auth/fetchRealUser')
    this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendarFilter')
  },
  methods: {
    clickHandler () {
      //
    },
    updateActiveItem (value) {
      this.$store.commit('analytics/mutations/handler/CHANGE_ANALYTICS_TIMEZONE', {
        rootData: this.$store.state.analytics.state.handler,
        data: value
      })
    },
    updateTimer () {
      clearInterval(this.ivl)
      this.ivl = setInterval(() => {
        this.ctr = this.ctr + 1
      }, this.speed)
    }
  }
}
</script>
