<template>
  <div class="popup-finance-data">
    <div class="popup-finance-data-head">
      <span class="popup-finance-data-head-title line-height-1-2" v-text="$t('Пополнение через {method}', { method: info.name })" />
    </div>
    <div class="popup-finance-data-container">
      <div v-if="depositData && depositData.length" class="popup-finance-data-container-bank">
        <div v-for="(item, key) in depositData" :key="key" class="popup-finance-data-container-bank-container">
          <div v-for="(elem, block) in item.description" :key="block" class="popup-finance-data-container-bank-container-column">
            <span class="popup-finance-data-container-bank-container-column-title" :class="`-${dir}`" v-text="elem.group" />
            <div v-for="(el, k) in elem.items" :key="k" class="popup-finance-data-container-bank-container-column-row">
              <span class="popup-finance-data-container-bank-container-column-row-title" :class="`-${dir}`" v-text="el.label" />
              <span class="popup-finance-data-container-bank-container-column-row-value" :class="`-${dir}`" v-text="el.value" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-finance-data-content -no_border">
      <div class="popup-finance-data-content-buttons">
        <b-button class="popup-finance-data-content-buttons-button" :class="`-${dir}`" variant="outline-primary" v-text="$t('Редактировать')" />
        <b-button class="popup-finance-data-content-buttons-button" :class="`-${dir}`" variant="primary" v-text="$t('Распечатать')" />
      </div>
      <div class="popup-finance-data-content-secure">
        <div class="popup-finance-data-content-secure-icon" :class="`-${dir}`">
          <lfx-icon-lock />
        </div>
        <span class="popup-finance-data-content-secure-text" v-text="'HTTP and SSL secure'" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconLock from '~/components/icons/lfx-icon-lock'
export default {
  name: 'PopupFinanceDepositBank',
  components: { LfxIconLock },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    infoResponse () {
      return this.$store.getters['finance/getters/handler/getDepositInfoResponse']
    },
    depositData () {
      return this.$store.getters['finance/getters/handler/getDepositDataResponse']
    }
  }
}
</script>
