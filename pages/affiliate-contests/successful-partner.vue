<template>
  <div class="partners-campaigns">
    <div class="partners-campaigns-head" :class="windowWidthNumber <= 767 ? 'mb-2' : 'mb-4'">
      <span class="partners-campaigns-head-title" v-text="$t('Конкурсы')" />
    </div>
    <div class="d-flex flex-column w-100">
      <div class="partners-current_contest">
        <div class="partners-current_contest-container">
          <img class="partners-current_contest-container-image" src="~/assets/images/contest.jpg" alt>
          <div class="partners-current_contest-container-data">
            <span class="partners-current_contest-container-data-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Успешный партнер')" />
            <div class="partners-current_contest-container-data-info">
              <div class="d-flex flex-column">
                <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовой фонд')" />
                <span class="text-dark-primary-17 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="successfulPartnerContest.prizeFund" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовые места')" />
                <span class="text-dark-primary-17 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="successfulPartnerContest.prizes" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Кол-во участников')" />
                <span class="text-dark-primary-17 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="successfulPartnerContest.numberParticipants" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Статус конкурса')" />
                <span class="text-dark-primary-17 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="successfulPartnerContest.contestStatus" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Начало конкурса')" />
                <span class="text-dark-primary-17 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="successfulPartnerContest.beginningCompetition" />
              </div>
            </div>
            <div v-if="windowWidthNumber >= 1100" class="partners-current_contest-container-data-stat">
              <div class="d-flex align-items-center">
                <b-button
                  v-if="successfulPartnerContest.isAlreadyRegistered"
                  class="partners-current_contest-container-data-stat-button"
                  variant="light-secondary"
                  v-text="$t('Уже зарегистрирован')"
                />
                <b-button
                  v-else
                  class="partners-current_contest-container-data-stat-button"
                  variant="primary"
                  @click="showPopup('successful-partner-participate')"
                  v-text="$t('Принять участие')"
                />
                <span
                  class="partners-current_contest-container-data-stat-link"
                  @click="openContestConditions"
                  v-text="$t('Условия проведения')"
                />
              </div>
              <div class="d-flex flex-column">
                <b-progress class="partners-current_contest-container-data-stat-progress" :value="successfulPartnerContest.progress" :max="100" />
                <span class="text-secondary-10 text-uppercase mt-1 line-height-1 w-100" :class="isRtlMode ? '' : 'text-right'" v-text="`${$t('Окончание')} ${successfulPartnerContest.ending}`" />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="windowWidthNumber < 1100"
          class="partners-current_contest-container-data-stat"
          style="padding: 15px 20px;"
        >
          <div v-if="windowWidthNumber < 767" class="d-flex flex-column w-100" style="margin-bottom: 20px;">
            <b-progress class="partners-current_contest-container-data-stat-progress" :value="successfulPartnerContest.progress" :max="100" />
            <span
              class="text-secondary-10 text-uppercase mt-1 line-height-1 w-100 text-center"
              v-text="`${$t('Окончание')} ${successfulPartnerContest.ending}`"
            />
          </div>
          <div class="d-flex align-items-center" :class="windowWidthNumber < 767 ? 'flex-column w-100' : ''">
            <b-button
              v-if="successfulPartnerContest.isAlreadyRegistered"
              class="partners-current_contest-container-data-stat-button"
              :class="windowWidthNumber < 767 ? 'w-100' : ''"
              variant="secondary"
              v-text="$t('Уже зарегистрирован')"
            />
            <b-button
              v-else
              class="partners-current_contest-container-data-stat-button"
              :class="windowWidthNumber < 767 ? 'w-100' : ''"
              variant="primary"
              v-text="$t('Принять участие')"
            />
            <span
              class="partners-current_contest-container-data-stat-link"
              :class="windowWidthNumber < 767 ? 'w-100 text-center mt-2' : ''"
              v-text="$t('Условия проведения')"
            />
          </div>
          <div v-if="windowWidthNumber > 767" class="d-flex flex-column">
            <b-progress class="partners-current_contest-container-data-stat-progress" :value="successfulPartnerContest.progress" :max="100" />
            <span
              class="text-secondary-10 text-uppercase mt-1 line-height-1 w-100 text-right"
              v-text="`${$t('Окончание')} ${successfulPartnerContest.ending}`"
            />
          </div>
        </div>
      </div>
      <div class="d-flex flex-column w-100" :class="windowWidthNumber <= 767 ? 'mt-2' : 'mt-4'">
        <div class="d-flex align-items-center" :class="windowWidthNumber <= 767 ? 'w-100 flex-column mt-2' : 'mt-4'">
          <b-button
            :class="windowWidthNumber <= 767 ? 'w-100' : ''"
            :variant="activeTable === 'current' ? 'primary' : 'outline-dark-primary'"
            @click="setActiveTable('current')"
            v-text="$t('Текущий рейтинг')"
          />
          <b-button
            :class="windowWidthNumber <= 767 ? 'w-100 mt-2' : ''"
            :variant="activeTable === 'current' ? 'outline-dark-primary' : 'primary'"
            @click="setActiveTable('previous')"
            v-text="$t('Результаты предыдущего конкурса')"
          />
        </div>
        <div class="partners-campaigns-table mt-4">
          <div class="partners-campaigns-table-head -contest">
            <span class="partners-campaigns-table-head-title-status" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Рейтинг')" />
            <span class="partners-campaigns-table-head-title-campaign" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Никнейм')" />
            <span class="partners-campaigns-table-head-title-type" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
            <span class="partners-campaigns-table-head-title-type" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовая сумма')" />
          </div>
          <div class="partners-campaigns-table-rows">
            <div v-for="(participant, key) in participants" :key="key" class="partners-campaigns-table-rows-row -contest">
              <template v-if="windowWidthNumber >= 1223">
                <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="key + 1" />
                <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="participant.nickname" />
                <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(participant.commission || 0).toFixed(2)} USD`" />
                <bdi class="partners-campaigns-table-rows-row-type text-success-17" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(participant.prizeAmount || 0).toFixed(2)} USD`" />
              </template>
              <template v-else>
                <div class="d-flex flex-column w-100">
                  <div class="d-flex flex-column w-100 mb-3">
                    <span class="partners-campaigns-table-head-title-status text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Рейтинг')" />
                    <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="key + 1" />
                  </div>
                  <div class="partners-campaigns-table-grid_rows">
                    <div class="d-flex flex-column">
                      <span class="partners-campaigns-table-head-title-visits text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Никнейм')" />
                      <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="participant.nickname" />
                    </div>
                    <div class="d-flex flex-column">
                      <span class="partners-campaigns-table-head-title-registrations text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
                      <bdi class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(participant.commission || 0).toFixed(2)} USD`" />
                    </div>
                    <div class="d-flex flex-column">
                      <span class="partners-campaigns-table-head-title-conversion text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовая сумма')" />
                      <bdi class="partners-campaigns-table-rows-row-type text-success-17" :class="isRtlMode ? 'text-right' : ''" v-text="`${Number(participant.prizeAmount || 0).toFixed(2)} USD`" />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffiliateContestsSuccessfulPartner',
  data () {
    return {
      activeTable: 'current'
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Конкурсы')}`)
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    successfulPartnerContest () {
      return this.$store.getters['partners/getters/handler/getSuccessfulPartnerContestData']
    },
    participants () {
      return this.$store.getters['partners/getters/handler/getSuccessfulPartnerContestTables'][this.activeTable]
    }
  },
  async created () {
    await this.$store.dispatch('partners/actions/handler/fetchSuccessfulPartnerContest')
    await this.$store.dispatch('partners/actions/handler/fetchSuccessfulPartnerContestTable')
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    setActiveTable (flag) {
      this.activeTable = flag
    },
    openContestConditions () {
      this.$store.dispatch('partners/actions/handler/fetchSuccessfulPartnerConditions')
    }
  }
}
</script>
