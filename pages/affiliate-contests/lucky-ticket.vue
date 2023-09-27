<template>
  <div class="d-flex flex-column">
    <lfx-menu-links
      v-if="isMenuFetched"
      :menu="menu"
      :title="luckyTicketContest.title"
      :active-item="activeMenuItem"
      @click-handler="menuClickHandler"
    />
    <div class="partners-current_contest-chapter">
      <div v-if="activeMenuItem === 'description'" class="partners-current_contest-chapter-description">
        <div class="partners-current_contest-chapter-description-head">
          <img
            v-if="windowWidth > 767"
            class="partners-current_contest-chapter-description-head-image"
            :class="`-${dir}`"
            src="~/assets/images/partners-contests-prize-13.png"
            alt
          >
          <div class="d-flex flex-column" :class="windowWidth <= 767 ? 'justify-content-center' : ''">
            <span
              class="partners-current_contest-chapter-description-head-title"
              :class="windowWidth > 767 && isRtlMode ? 'text-right' : ''"
              v-text="description.title"
            />
            <img
              v-if="windowWidth <= 767"
              class="partners-current_contest-chapter-description-head-image -xs"
              src="~/assets/images/partners-contests-prize-13.png"
              alt
            >
            <span
              class="partners-current_contest-chapter-description-head-desc"
              :class="windowWidth > 767 && isRtlMode ? 'text-right' : ''"
              v-text="description.desc"
            />
            <span
              class="partners-current_contest-chapter-description-head-pull"
              :class="windowWidth > 767 && isRtlMode ? 'text-right' : ''"
              v-text="description.pull"
            />
            <span
              class="partners-current_contest-chapter-description-head-money"
              :class="windowWidth > 767 && isRtlMode ? 'text-right' : ''"
              v-text="description.money"
            />
            <b-button
              class="partners-current_contest-chapter-description-head-button"
              variant="primary"
              @click="goToContestsPage"
              v-text="description['button-name']"
            />
          </div>
        </div>
        <div class="partners-current_contest-chapter-description-stages">
          <span
            class="partners-current_contest-chapter-description-stages-title"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="description['stages-title']"
          />
          <div class="partners-current_contest-chapter-description-stages-items">
            <div
              v-for="stage in description['stages-body']"
              :key="stage.icon"
              :class="`-${dir}`"
              class="partners-current_contest-chapter-description-stages-items-item"
            >
              <div class="partners-current_contest-chapter-description-stages-items-item-icon" :class="`-${dir}`">
                <lfx-icon-referrals v-if="stage.icon === 'icon-referrals'" />
                <lfx-icon-ticket v-else-if="stage.icon === 'icon-ticket'" />
                <lfx-icon-winner v-else-if="stage.icon === 'icon-winner'" />
              </div>
              <span
                class="partners-current_contest-chapter-description-stages-items-item-title"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="stage.desc"
              />
            </div>
          </div>
        </div>
        <div class="partners-current_contest-chapter-description-stages_desc">
          <span class="partners-current_contest-chapter-description-stages_desc-text" v-text="description['stages-desc']" />
          <div class="partners-current_contest-chapter-description-stages_desc-example">
            <span class="partners-current_contest-chapter-description-stages_desc-example-title" v-text="description['stages-title-lucky']" />
            <div class="d-flex align-items-center" :class="windowWidth <= 767 ? 'flex-column' : ''">
              <div class="partners-current_contest-chapter-description-stages_desc-example-number">
                <span v-text="description['lucky-number']" />
              </div>
              <div class="d-flex flex-column">
                <span class="partners-current_contest-chapter-description-stages_desc-example-text" v-text="description['lucky-date']" />
                <span class="partners-current_contest-chapter-description-stages_desc-example-text" v-text="description['link-popup-api']" />
                <span class="partners-current_contest-chapter-description-stages_desc-example-link" @click="openAlgorithmPopup" v-text="description['link-popup-api-text']" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'participants'" class="partners-current_contest-chapter-participants">
        <lfx-table-contest-participants v-if="windowWidth > 767" class="partners-current_contest-chapter-participants-table" :items="participants" :fields="['place-value', 'uid-value']" />
        <div v-else class="partners-current_contest-chapter-participants-cards">
          <div v-for="(participant, key) in participants" :key="key" class="partners-current_contest-chapter-participants-cards-card">
            <div class="d-flex flex-column w-70">
              <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Номер билета участника')" />
              <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="participant['place-value']" />
            </div>
            <div class="d-flex flex-column w-30">
              <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="'Uid'" />
              <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="participant['uid-value']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'conditions'" class="partners-current_contest-chapter-conditions">
        <span class="partners-current_contest-chapter-conditions-title" :class="isRtlMode ? 'text-right' : ''" v-text="conditions.title" />
        <div class="partners-current_contest-chapter-conditions-description" :class="isRtlMode ? 'text-right' : ''" v-html="conditions.data" />
      </div>
      <div v-else-if="activeMenuItem === 'winners'" class="partners-current_contest-chapter-winners">
        <lfx-table-contest-winners v-if="windowWidth > 767" class="partners-current_contest-chapter-winners-table" :items="winners" />
        <div v-else class="partners-current_contest-chapter-participants-cards">
          <div v-for="(winner, key) in winners" :key="key" class="partners-current_contest-chapter-participants-cards-card">
            <div class="d-flex flex-column w-50">
              <div class="d-flex flex-column w-100 mb-3">
                <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Номер билета участника')" />
                <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="winner['number-value']" />
              </div>
              <div class="d-flex flex-column w-100">
                <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Месяц')" />
                <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="winner['month-value']" />
              </div>
            </div>
            <div class="d-flex flex-column w-50">
              <div class="d-flex flex-column w-100 mb-3">
                <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="'Uid'" />
                <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="winner['uid-value']" />
              </div>
              <div class="d-flex flex-column w-100">
                <span class="text-secondary-10 text-uppercase w-100" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовая сумма')" />
                <span class="text-dark-primary-14 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="winner['prize-amount-value']" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
import LfxIconReferrals from '~/components/icons/lfx-icon-referrals'
import LfxIconTicket from '~/components/icons/lfx-icon-ticket'
import LfxIconWinner from '~/components/icons/lfx-icon-winner'
import LfxTableContestParticipants from '~/components/tables/lfx-table-contest-participants'
import LfxTableContestWinners from '~/components/tables/lfx-table-contest-winners'
export default {
  name: 'AffiliateContestsLuckyTicket',
  components: {
    LfxTableContestParticipants,
    LfxTableContestWinners,
    LfxIconWinner,
    LfxIconTicket,
    LfxIconReferrals,
    LfxMenuLinks
  },
  data () {
    return {
      activeMenuItem: 'description'
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Конкурсы')}`)
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    luckyTicketContest () {
      return this.$store.getters['partners/getters/handler/getLuckyTicketContestData']
    },
    description () {
      return this.luckyTicketContest.description
    },
    participants () {
      return this.luckyTicketContest.participants
    },
    conditions () {
      return this.luckyTicketContest.conditions
    },
    winners () {
      return this.luckyTicketContest.winners
    },
    menu () {
      return [...this.luckyTicketContest.pageMenu].map((item, index) => {
        const elem = { title: item, flag: null }
        switch (index) {
          case 0:
            elem.flag = 'description'
            break
          case 1:
            elem.flag = 'participants'
            break
          case 2:
            elem.flag = 'conditions'
            break
          case 3:
            elem.flag = 'winners'
            break
        }
        return elem
      })
    },
    isMenuFetched () {
      return this.menu.every(item => item.flag)
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  created () {
    this.$store.dispatch('partners/actions/handler/fetchLuckyTicketContest')
  },
  methods: {
    menuClickHandler (item) {
      this.activeMenuItem = item
    },
    openAlgorithmPopup () {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-lucky-ticket-contest-algorithm')
    },
    goToContestsPage () {
      this.$router.push(`/${this.routePages.locale}/affiliate-contests`)
    }
  }
}
</script>
