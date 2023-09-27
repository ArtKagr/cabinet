<template>
  <div class="profile-page-copiers">
    <div v-if="copiersHistoryList && copiersHistoryList.length" class="profile-page-copiers-table">
      <lfx-table-copiers-history :items="copiersHistoryList" />
    </div>
    <div v-else class="profile-page-copiers-empty_container">
      <div v-for="(item, key) in copiersHistoryNoData" :key="key">
        <span v-if="typeof item.content === 'string' && item.type === 'title'" style="color: #5f6875; font-size: 20px;" v-text="item.content" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxTableCopiersHistory from '~/components/tables/lfx-table-copiers-history'
export default {
  name: 'CopiersHistory',
  components: { LfxTableCopiersHistory },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Копировали меня')}`)
    }
  },
  computed: {
    copiersHistoryList () {
      return this.$store.getters['profile/getters/handler/getCopiersHistoryList']
    },
    copiersHistoryNoData () {
      return this.$store.getters['profile/getters/handler/getCopiersHistoryNoData']
    }
  },
  created () {
    this.$store.dispatch('profile/actions/handler/fetchCopiersHistory')
  }
}
</script>
