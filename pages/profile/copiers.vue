<template>
  <div class="profile-page-copiers">
    <div v-if="copiersList.length" class="profile-page-copiers-table">
      <lfx-table-copiers :items="copiersList" />
    </div>
    <div v-else class="profile-page-copiers-empty_container">
      <div v-for="(item, key) in copiersNoData" :key="key">
        <span v-if="typeof item.content === 'string' && item.type === 'title'" style="color: #5f6875; font-size: 20px;" v-text="item.content" />
        <span v-else-if="typeof item.content === 'string' && item.type === 'text'" style="color: #788496; font-size: 14px;" v-text="item.content" />
        <span v-else-if="typeof item.content === 'string' && item.type === 'list'" v-text="item.content" />
        <div v-else-if="item.content && item.content.length" class="d-flex flex-column my-3">
          <span v-for="(block, elem) in item.content" :key="elem" class="text-secondary-14 mb-1" v-text="`${elem + 1}. ${block}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxTableCopiers from '~/components/tables/lfx-table-copiers'
export default {
  name: 'Copiers',
  components: { LfxTableCopiers },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Копируют меня')}`)
    }
  },
  computed: {
    copiersList () {
      return this.$store.getters['profile/getters/handler/getCopiersList']
    },
    copiersNoData () {
      return this.$store.getters['profile/getters/handler/getCopiersNoData']
    }
  },
  created () {
    this.$store.dispatch('profile/actions/handler/fetchCopiers')
  }
}
</script>
