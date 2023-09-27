<template>
  <profile-chart
    class="profile-page-chart"
    source="chart-profile"
    trader-user-name="Profile"
  />
</template>

<script>
import ProfileChart from '~/components/chart/chart'
export default {
  name: 'Chart',
  components: { ProfileChart },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('График доходности')}`)
    }
  }
}
</script>
