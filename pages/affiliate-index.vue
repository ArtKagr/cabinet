<template>
  <div class="partners-campaigns">
    <div class="partners-programs">
      <div v-for="(program, key) in programs" :key="key" class="partners-programs-program" :class="`-${dir}`">
        <img v-if="program.type === 'cps'" src="../assets/images/program_cps.jpg" alt class="partners-programs-program-image">
        <img v-else-if="program.type === 'pr-reb'" src="../assets/images/program_rebate.jpg" alt class="partners-programs-program-image">
        <img v-else-if="program.type === 'reg-rep'" src="../assets/images/program_regional_representative.jpg" alt class="partners-programs-program-image">
        <div class="partners-programs-program-body">
          <span class="partners-programs-program-body-title" :class="isRtlMode ? 'text-right' : ''" v-text="program.title" />
          <span class="partners-programs-program-body-text" :class="isRtlMode ? 'text-right' : ''" v-text="program.desc" />
          <b-button
            class="partners-programs-program-body-button"
            variant="primary"
            @click="fetchForm(program)"
            v-text="program.icon === 'reg-rep' ? $t('Отправить заявку') : $t('Создать кампанию')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffiliateIndex',
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Партнерские программы')}`)
    }
  },
  computed: {
    programs () {
      return [
        {
          title: 'Rev. share',
          icon: 'ref-share',
          desc: this.$t('По данной программе Вы получаете до {amount} за каждую сделку Вашего реферала и 10% от прибыли субпартнеров. Хотите стабильный высокий заработок? Расскажите о компании своим друзьям и знакомым, привлекайте активно торгующих трейдеров, помогая им зарегистрироваться и начать торговлю в LiteForex, и расширяйте свою партнерскую сеть.', { amount: '15 USD' }),
          type: 'pr-reb',
          button: this.$t('Создать кампанию')
        },
        {
          title: 'CPS',
          icon: 'cps',
          desc: this.$t('Привлекайте трейдеров в компанию LiteFinance Global LLC и получайте по 50 USD за каждого приведенного Вами реферала! Партнерская программа CPS также предусматривает многоуровневость и дает возможность получать 10% от прибыли привлеченных Вами субпартнеров, работающих по программе «Revenue Share». Чем больше людей Вы привлечете – тем выше будет Ваш заработок.'),
          type: 'cps',
          button: this.$t('Создать кампанию')
        },
        {
          title: this.$t('Региональный представитель'),
          icon: 'reg-rep',
          desc: this.$t('Хотите начать собственный серьезный бизнес с международным брокером? Используйте уникальный шанс открыть представительство LiteForex в Вашем городе и быть лицом LiteForex в Вашей стране. Возглавьте региональный офис LiteForex и получайте стабильный высокий доход. Региональные представители становятся частью нашей официальной команды и помимо стандартной комиссии получают дополнительные выплаты, сумма которых обсуждается индивидуально.'),
          type: 'reg-rep',
          button: this.$t('Отправить заявку')
        }
      ]
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    async fetchForm (program) {
      if (program.icon === 'reg-rep') {
        await this.$store.dispatch('forms/actions/handler/fetchForm', 'affiliatePrograms')
      } else {
        localStorage.setItem('program-type', program.type)
        await this.$store.dispatch('forms/actions/handler/fetchForm', 'affiliateCreateCompany')
      }
    }
  }
}
</script>
