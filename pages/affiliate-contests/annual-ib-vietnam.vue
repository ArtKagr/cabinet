<template>
  <div class="d-flex flex-column">
    <lfx-menu-links
      v-if="isMenuFetched"
      :menu="menu"
      :title="annualIbVietnamContest.title"
      :active-item="activeMenuItem"
      @click-handler="menuClickHandler"
    />
    <div class="partners-current_contest-chapter">
      <div v-if="activeMenuItem === 'description'" class="partners-current_contest-chapter-description">
        <div class="partners-current_contest-chapter-description-head flex-column">
          <span class="partners-current_contest-chapter-description-head-prizes_title mb-2" v-text="description.title" />
          <div class="d-flex w-100">
            <flickity class="partners-current_contest-chapter-description-head-prizes" :options="flickityOptions">
              <div
                v-for="(prize, key) in description.prizes"
                :key="key"
                :class="`-${dir}`"
                class="partners-current_contest-chapter-description-head-prizes-prize"
              >
                <div v-if="prize.class === 'prize-9'" class="partners-current_contest-chapter-description-head-prizes-prize-image">
                  <img src="~/assets/images/partners-contests-prize-9.png" alt>
                </div>
                <div v-if="prize.class === 'prize-10'" class="partners-current_contest-chapter-description-head-prizes-prize-image">
                  <img src="~/assets/images/partners-contests-prize-10.png" alt>
                </div>
                <div v-if="prize.class === 'prize-11'" class="partners-current_contest-chapter-description-head-prizes-prize-image">
                  <img src="~/assets/images/partners-contests-prize-11.png" alt>
                </div>
                <div v-if="prize.class === 'prize-12'" class="partners-current_contest-chapter-description-head-prizes-prize-image">
                  <img src="~/assets/images/partners-contests-prize-12.png" alt>
                </div>
                <span class="partners-current_contest-chapter-description-head-prizes-prize-desc" v-text="prize.desc" />
                <span class="partners-current_contest-chapter-description-head-prizes-prize-name" v-text="prize.name" />
              </div>
            </flickity>
          </div>
          <span class="partners-current_contest-chapter-description-head-prizes-prize-note" v-text="description['prizes-note-1']" />
          <span class="partners-current_contest-chapter-description-head-prizes-prize-note" v-text="description['prizes-note-2']" />
        </div>
        <div class="partners-current_contest-chapter-description-stages">
          <span
            class="partners-current_contest-chapter-description-stages-title"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="description['stages-title']"
          />
          <div class="partners-current_contest-chapter-description-stages-items">
            <div
              v-for="stage in description.steps"
              :key="stage.icon"
              :class="`-${dir}`"
              class="partners-current_contest-chapter-description-stages-items-item"
            >
              <div class="partners-current_contest-chapter-description-stages-items-item-icon">
                <lfx-icon-referrals v-if="stage.icon === 'icon-referrals'" />
                <lfx-icon-get-money v-else-if="stage.icon === 'icon-get-money'" />
                <lfx-icon-winner v-else-if="stage.icon === 'icon-winner'" />
              </div>
              <span
                class="partners-current_contest-chapter-description-stages-items-item-title"
                :class="`-${dir}`"
                v-text="stage.desc"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'participants'" class="partners-current_contest-chapter-participants -annual_ib">
        <lfx-table-contest-participants
          v-if="windowWidth > 767"
          source="annual-ib"
          class="partners-current_contest-chapter-participants-table"
          :items="participants"
          :fields="['place-value', 'uid-value', 'lots-value', 'active-referrals-value', 'rating-value', 'prize-amount-value']"
        />
        <div v-else class="partners-current_contest-chapter-participants-cards">
          <div v-for="(participant, key) in participants" :key="key" class="partners-current_contest-chapter-participants-cards-card">
            <div class="d-flex flex-column w-50">
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Место')"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['place-value']"
                />
              </div>
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Количество лотов')"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['lots-value']"
                />
              </div>
              <div class="d-flex flex-column w-100">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Очки')"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['rating-value']"
                />
              </div>
            </div>
            <div class="d-flex flex-column w-50">
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="'Uid'"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['uid-value'] === 'Это вы' ? $t('Это вы') : participant['uid-value']"
                />
              </div>
              <div class="d-flex flex-column w-100 mb-3">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Активные рефералы')"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['active-referrals-value']"
                />
              </div>
              <div class="d-flex flex-column w-100">
                <span
                  class="text-secondary-10 text-uppercase w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="$t('Призовая сумма')"
                />
                <span
                  class="text-dark-primary-14 w-100"
                  :class="isRtlMode ? 'text-right' : ''"
                  v-text="participant['prize-amount-value']"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'conditions'" class="partners-current_contest-chapter-conditions">
        <span class="partners-current_contest-chapter-conditions-title" :class="isRtlMode ? 'text-right' : ''" v-text="conditions.title" />
        <div class="partners-current_contest-chapter-conditions-description" :class="isRtlMode ? 'text-right' : ''" v-html="conditions.data" />
      </div>
      <div v-else-if="activeMenuItem === 'winners'" class="partners-current_contest-chapter-winners">
        <span class="partners-current_contest-chapter-winners-title" :class="isRtlMode ? 'text-right' : ''" v-text="winners[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
import LfxIconReferrals from '~/components/icons/lfx-icon-referrals'
import LfxIconGetMoney from '~/components/icons/lfx-icon-get-money'
import LfxIconWinner from '~/components/icons/lfx-icon-winner'
import LfxTableContestParticipants from '~/components/tables/lfx-table-contest-participants'
export default {
  name: 'AffiliateContestsAnnualIbVietnam',
  components: {
    LfxTableContestParticipants,
    LfxMenuLinks,
    LfxIconReferrals,
    LfxIconGetMoney,
    LfxIconWinner
  },
  data () {
    return {
      activeMenuItem: 'description',
      links: [
        '~/assets/images/partners-contests-prize-9.png',
        '~/assets/images/partners-contests-prize-10.png',
        '~/assets/images/partners-contests-prize-11.png',
        '~/assets/images/partners-contests-prize-12.png'
      ]
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
    annualIbVietnamContest () {
      return this.$store.getters['partners/getters/handler/getAnnualIbVietnamContest']
    },
    description () {
      return this.annualIbVietnamContest.description
    },
    participants () {
      return this.annualIbVietnamContest.participants
    },
    conditions () {
      return this.annualIbVietnamContest.conditions
    },
    winners () {
      return this.annualIbVietnamContest.winners
    },
    menu () {
      return [...this.annualIbVietnamContest.pageMenu].map((item, index) => {
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
    flickityOptions () {
      return {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        imagesLoaded: true,
        contain: true,
        cellAlign: this.isRtlMode ? 'right' : 'left',
        rightToLeft: this.isRtlMode,
        draggable: true
      }
    }
  },
  created () {
    this.$store.dispatch('partners/actions/handler/fetchAnnualIbVietnamContest')
  },
  methods: {
    menuClickHandler (item) {
      this.activeMenuItem = item
    }
  }
}
</script>
