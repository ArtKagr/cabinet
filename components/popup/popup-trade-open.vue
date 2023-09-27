<template>
  <div class="popup-trade">
    <div class="popup-trade-container">
      <div class="lfx-forms-trade_success">
        <div class="lfx-forms-trade_success-icon">
          <svg width="46" height="43" viewBox="0 0 46 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5757 0.000108854C21.2776 0.000108854 20.9791 0.00523109 20.6806 0.0159815C19.0888 0.0755694 17.4854 0.315462 15.9176 0.735905C4.4839 3.80233 -2.33005 15.6239 0.733607 27.068C3.79726 38.512 15.6082 45.3321 27.0419 42.2657C38.4756 39.1993 45.2896 27.3777 42.2259 15.9336C42.1685 15.6616 42.0563 15.4041 41.8962 15.1768C41.7362 14.9496 41.5315 14.7573 41.2948 14.6118C41.0581 14.4663 40.7942 14.3706 40.5193 14.3304C40.2444 14.2903 39.9643 14.3066 39.6959 14.3784C39.4275 14.4502 39.1765 14.5759 38.9583 14.7479C38.74 14.92 38.559 15.1347 38.4264 15.379C38.2937 15.6233 38.2121 15.892 38.1866 16.1689C38.1611 16.4458 38.1922 16.725 38.2781 16.9895C40.7694 26.2957 35.2848 35.8207 25.987 38.3144C16.6893 40.8079 7.1728 35.3183 4.68143 26.0121C2.19015 16.7059 7.67475 7.18092 16.9725 4.68728C22.0514 3.32521 27.477 4.33759 31.725 7.43887C31.9422 7.59749 32.1885 7.71171 32.4499 7.77504C32.7112 7.83838 32.9825 7.84957 33.2481 7.80798C33.5138 7.76638 33.7687 7.67283 33.9982 7.53264C34.2278 7.39246 34.4275 7.20841 34.5859 6.99097C34.7444 6.77354 34.8585 6.52698 34.9218 6.26539C34.9851 6.00381 34.9963 5.73233 34.9547 5.46642C34.9132 5.20051 34.8197 4.94537 34.6796 4.71562C34.5396 4.48587 34.3557 4.28601 34.1384 4.1274C30.4504 1.43494 26.0464 0.0187515 21.5757 1.51177e-05V0.000108854ZM43.8562 1.51991C43.3251 1.54932 42.8264 1.78456 42.4656 2.17578C37.0729 7.82307 26.2953 19.4913 20.313 25.8043L13.1205 19.4532C12.919 19.2746 12.6844 19.1375 12.4299 19.0497C12.1755 18.9619 11.9063 18.9251 11.6376 18.9415C11.369 18.9578 11.1062 19.027 10.8643 19.1449C10.6223 19.2629 10.406 19.4275 10.2276 19.6292C10.0492 19.8308 9.9122 20.0657 9.82448 20.3204C9.73676 20.5751 9.70001 20.8445 9.71634 21.1134C9.73267 21.3823 9.80174 21.6453 9.91963 21.8874C10.0375 22.1296 10.2019 22.3461 10.4034 22.5247L19.0982 30.2036C19.4962 30.5564 20.0156 30.7403 20.5466 30.7164C21.0777 30.6925 21.5785 30.4627 21.9433 30.0757C27.6638 24.0851 39.7772 10.9032 45.4226 4.99136C45.7083 4.69656 45.8988 4.32258 45.9695 3.91799C46.0401 3.5134 45.9875 3.0969 45.8187 2.72258C45.6498 2.34826 45.3723 2.0334 45.0224 1.81893C44.6724 1.60446 44.2661 1.50029 43.8562 1.51991Z" fill="white" />
          </svg>
        </div>
        <span class="lfx-forms-trade_success-title" v-text="$t('Сделка успешно открыта')" />
        <div class="lfx-forms-trade_success-container">
          <div class="lfx-forms-trade_success-container-data">
            <span
              class="lfx-forms-trade_success-container-data-title -first"
              v-text="closedCurrentTradeType"
            />
            <span
              class="lfx-forms-trade_success-container-data-value"
              v-text="closedCurrentTrade.symbol"
            />
          </div>
          <div class="lfx-forms-trade_success-container-data">
            <span
              class="lfx-forms-trade_success-container-data-title"
              v-text="$t('Цена сделки')"
            />
            <span
              class="lfx-forms-trade_success-container-data-value"
              v-text="closedCurrentTrade.price"
            />
          </div>
          <div class="lfx-forms-trade_success-container-data">
            <span
              class="lfx-forms-trade_success-container-data-title"
              v-text="$t('Объем сделки')"
            />
            <span
              class="lfx-forms-trade_success-container-data-value"
              v-text="closedCurrentTrade.volume"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'
export default {
  name: 'PopupTradeOpen',
  mixins: [modal],
  computed: {
    closedCurrentTrade () {
      return this.$store.getters['trading/getters/handler/getClosedCurrentTrade']
    },
    closedCurrentTradeType () {
      let result
      switch (this.closedCurrentTrade.cmd) {
        case 0:
        case 'CMD_BUY':
          result = this.$t('Покупка')
          break
        case 1:
        case 'CMD_SELL':
          result = this.$t('Продажа')
          break
        case 2:
        case 4:
        case 6:
          result = this.$t('Покупка по цене')
          break
        case 3:
        case 5:
        case 7:
          result = this.$t('Продажа по цене')
          break
        default:
          result = 'Unknown'
      }
      return result
    }
  },
  created () {
    setTimeout(() => {
      this.$store.dispatch('dictionaries/actions/handler/toggleTradeOpenPopup', false)
    }, 3000)
  }
}
</script>
<style lang="scss">
  .popup-trade {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9999;
    transition: all .4s;
    background: rgba(59,75,104,.25);
    padding-top: 30px;
    overflow: auto;

    @media screen and (max-width: 767px) {
      padding: 0;
      height: calc(100% - 60px);
      transform: translateY(60px);
      z-index: 2999;
      border-top: 1px solid #eaeced;
    }

    &-container {
      width: 350px;
      background-color: #47BF6F;
      border-radius: 5px;
    }
  }
</style>
