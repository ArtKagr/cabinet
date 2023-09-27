<template>
  <div v-if="isMobileSearchHidden" class="header-search pointer -mobile" @click="toggleSearch(false)">
    <b-icon-search class="header-search-prepend-icon" />
  </div>
  <div v-else class="header-mobile_container">
    <div class="header-mobile_container-search_icon" @click="toggleSearch(false)">
      <b-icon-search class="header-mobile_container-search_icon-icon" />
    </div>
    <div class="header-mobile_container-search">
      <b-form-input
        ref="cabinet-search-mobile"
        v-model="changedSearchValue"
        :placeholder="isPartnerMode ? $t('Найти реферала') : $t('Найти трейдера, торговый инструмент')"
        @click="getCabinetSearch"
      />
    </div>
    <div class="header-mobile_container-close" @click="toggleSearch(true)">
      <lfx-icon-close class="popup-custom-container-modal-close" />
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'
import LfxIconClose from '~/components/icons/lfx-icon-close'
export default {
  name: 'HeaderSearchMobile',
  components: { LfxIconClose },
  mixins: [modal],
  data () {
    return {
      inputRef: 'cabinet-search-mobile',
      isMobileSearchHidden: true
    }
  },
  computed: {
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    }
  },
  methods: {
    toggleSearch (flag) {
      this.isMobileSearchHidden = flag
      this.$emit('toggle-search', this.isMobileSearchHidden)
      this.closeSearchPopup()
    }
  }
}
</script>
<style lang="scss">
  .header-mobile_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-search_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-right: 1px solid #eaeced;

      &-icon {
        width: 20px;
        height: 20px;
      }
    }

    &-search {
      width: calc(100% - 60px);
      padding: 15px 10px;

      input {
        border: none;
        font-size: 16px;
        padding: 0;

        &::placeholder {
          color: #8e9aac;
        }
      }
    }

    &-close {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
    }
  }
</style>
