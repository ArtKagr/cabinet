<template>
  <b-input-group class="header-search" :class="`-${dir}`">
    <b-input-group-prepend class="header-search-prepend">
      <b-icon-search class="header-search-prepend-icon" />
    </b-input-group-prepend>
    <b-form-input
      ref="cabinet-search"
      v-model="changedSearchValue"
      :placeholder="isPartnerMode ? $t('Найти реферала') : $t('Найти трейдера, торговый инструмент')"
      class="header-search-input"
      @click="getCabinetSearch"
    />
  </b-input-group>
</template>

<script>
import modal from '~/mixins/modal'
export default {
  name: 'HeaderSearch',
  mixins: [modal],
  data () {
    return {
      inputRef: 'cabinet-search'
    }
  },
  computed: {
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
