<template>
  <div class="trading-page-instrument-settings" :class="[`-${dir}`, `-${source}`, windowWidthNumber < 1000 && source === 'instrument' ? '-hidden' : '']">
    <div v-if="source === 'instrument'" class="d-flex align-items-center w-100 justify-content-between py-3 px-4">
      <span class="trading-page-instrument-settings-title text-dark-primary-20 p-0" v-text="$t('Копирование')" />
      <lfx-icon-fullscreen class="pointer" @click.native="openFullScreenChart" />
    </div>
    <div class="d-flex flex-column text-white-12 font-weight-600 bg-primary py-2">
      <span class="lfx-popup-change_trade-type-title" v-text="$t('Точка входа')" />
      <span class="lfx-popup-change_trade-type-value line-height-1" v-text="`${Number(trader.profit || 0).toFixed(2)}%`" />
    </div>
    <div v-if="amountField" class="popup-trades-change-body-amount">
      <b-form-group
        :label="amountField.label"
        :label-for="amountField.attribute"
        :description="amountField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
      >
        <field-numeric
          v-model="amountField.value"
          class="popup-trades-change-body-amount-input"
          :label="account.currency"
          :digits="2"
          :min="0"
          :max="999999"
          :counter="10"
          @change="setValue($event, amountField.attribute)"
        />
      </b-form-group>
      <span class="popup-trades-change-body-amount-total" :class="involvedFunds > 100 ? 'text-danger-12' : ''" v-text="$t('{involvedFunds}% средств', { involvedFunds })" />
    </div>
    <div v-if="currentTraderInvestment.is_copying" class="popup-trades-change-body-data-values">
      <div class="popup-trades-change-body-data-values-item">
        <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая доходность')" />
        <bdi
          v-if="currentTraderInvestment && currentTraderInvestment.investment && currentTraderInvestment.investment.current_price"
          class="popup-trades-change-body-data-values-item-value"
          :class="[`-${dir}`, dataClass(currentTraderInvestment.investment.current_price.replace(/%/gi, ''))]"
          v-text="currentTraderInvestment.investment.current_price"
        />
        <bdi v-else class="popup-trades-change-body-data-values-item-value" v-text="'0.00%'" />
      </div>
      <div class="popup-trades-change-body-data-values-item">
        <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая прибыль')" />
        <bdi
          class="popup-trades-change-body-data-values-item-value"
          :class="[`-${dir}`, dataClass(currentTraderInvestment.investment.changedProfit)]"
          v-text="dataValue(currentTraderInvestment.investment.changedProfit)"
        />
      </div>
    </div>
    <div class="popup-trades-change-body-data">
      <div class="popup-trades-change-body-data-collapse">
        <div v-b-toggle:trades-investment-change class="popup-trades-change-body-data-collapse-chevron" :class="`-${dir}`">
          <lfx-icon-chevron-down class="when-closed" />
          <lfx-icon-chevron-down class="when-open rotate_180" />
        </div>
        <span v-b-toggle.trades-investment-change class="popup-trades-change-body-data-collapse-title" v-text="$t('Настройки копирования')" />
      </div>
      <b-collapse id="trades-investment-change">
        <div v-if="copyTypeField" class="popup-trades-change-body-data-conditions pb-1">
          <div v-if="copyOpenedTradesField" class="popup-trades-change-body-data-conditions-row">
            <b-form-group
              :label-for="copyOpenedTradesField.attribute"
              :description="copyOpenedTradesField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-checkbox
                :id="copyOpenedTradesField.attribute"
                v-model="copyOpenedTradesField.value"
                :error="!!copyOpenedTradesField.error"
                :label="copyOpenedTradesField.label"
                :size="20"
                @change="setValue($event, copyOpenedTradesField.attribute)"
              />
            </b-form-group>
          </div>
          <div class="popup-trades-change-body-data-conditions-row">
            <b-form-group
              :label="copyTypeField.label"
              :label-for="copyTypeField.attribute"
              :description="copyTypeField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-select
                v-model="copyTypeField.value"
                class="popup-trades-change-body-data-conditions-row-copy_type"
                :values="copyTypeField.values"
                @change="setValue($event, copyTypeField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="copyTypeField.value === 2" class="popup-trades-change-body-data-conditions-row">
            <b-form-group
              :label="fixVolumeField.label"
              :label-for="fixVolumeField.attribute"
              :description="fixVolumeField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-numeric
                v-model="fixVolumeField.value"
                class="popup-trades-change-body-data-conditions-row-input"
                :digits="2"
                :min="0"
                :max="100"
                :counter="0.01"
                @change="setValue($event, fixVolumeField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="copyTypeField.value === 3" class="popup-trades-change-body-data-conditions-row">
            <b-form-group
              :label="percentVolumeField.label"
              :label-for="percentVolumeField.attribute"
              :description="percentVolumeField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-numeric
                v-model="percentVolumeField.value"
                class="popup-trades-change-body-data-conditions-row-input"
                label="%"
                :digits="0"
                :min="1"
                :max="10000"
                :counter="1"
                @change="setValue($event, percentVolumeField.attribute)"
              />
            </b-form-group>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <b-form-group
                :label="slField.label"
                :label-for="slField.attribute"
                :description="slField.error"
                :dir="dir"
                :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
              >
                <field-numeric
                  v-model="slField.value"
                  class="popup-trades-change-body-data-conditions-row-input -loss"
                  :label="account.currency"
                  :digits="0"
                  :min="Number.MIN_SAFE_INTEGER"
                  :max="0"
                  :counter="1"
                  @change="setValue($event, slField.attribute)"
                />
              </b-form-group>
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <b-form-group
                :label="tpField.label"
                :label-for="tpField.attribute"
                :description="tpField.error"
                :dir="dir"
                :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
              >
                <field-numeric
                  v-model="tpField.value"
                  class="popup-trades-change-body-data-conditions-row-input -profit"
                  :label="account.currency"
                  :digits="0"
                  :min="0"
                  :max="Number.MAX_SAFE_INTEGER"
                  :counter="1"
                  @change="setValue($event, tpField.attribute)"
                />
              </b-form-group>
            </div>
          </div>
          <div v-if="pauseField" class="popup-trades-change-body-data-conditions-row">
            <b-form-group
              :label="pauseField.label"
              :label-for="pauseField.attribute"
              :description="pauseField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-select
                v-model="pauseField.value"
                class="popup-trades-change-body-data-conditions-row-copy_type"
                :values="pauseField.values"
                @change="setValue($event, pauseField.attribute)"
              />
            </b-form-group>
          </div>
        </div>
      </b-collapse>
    </div>
    <div v-if="currentTraderInvestment.is_copying" class="d-flex flex-column w-100 px-3 pb-3">
      <b-button
        ref="form-button"
        variant="primary"
        class="w-100 text-white-16"
        :disabled="isChangeDisabled"
        @click="copyAction"
        v-text="$t('Изменить')"
      />
      <b-button
        variant="danger"
        class="w-100 mt-2 text-white-16"
        @click="stopCopying"
        v-text="$t('Остановить копирование')"
      />
    </div>
    <div v-else class="d-flex flex-column w-100 px-3 pb-3">
      <b-button variant="primary" class="w-100 text-white-16" @click="copyAction" v-text="$t('Копировать')" />
    </div>
    <div v-if="isDemo" class="d-flex flex-column px-3 mt-2">
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
        </div>
        <span class="text-secondary-14" v-text="$t('Режим демо-торговли')" />
      </div>
      <div class="d-flex">
        <div class="mr-2">
          <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
        </div>
        <span
          class="text-secondary-14"
          v-text="$t('Для сохранения торговых действий неоходимо {linkReg}зарегистрироваться{linkClose} или {linkAuth}авторизироваться{linkClose}', { linkReg: '', linkClose: '', linkAuth: '' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
import LfxIconFullscreen from '~/components/icons/lfx-icon-fullscreen'
import FieldNumeric from '~/components/modal/fields/field-numeric'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'

export default {
  name: 'Settings',
  components: { LfxIconChevronDown, FieldCheckbox, FieldSelect, FieldNumeric, LfxIconInfo, LfxIconFullscreen },
  mixins: [form],
  props: {
    source: {
      type: String,
      default: 'instrument'
    }
  },
  data () {
    return {
      isChangeDisabled: true
    }
  },
  computed: {
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    trader () {
      return this.$store.getters['traders/getters/handler/getCurrentTrader'].data
    },
    currentTraderInvestment () {
      return this.$store.getters['traders/getters/handler/getCurrentTraderInvestment']
    },
    involvedFunds () {
      if (this.amountField) {
        return ((this.amountField.value * 100) / this.account.balance).toFixed(2)
      }

      return 0
    },
    amountField () {
      return this.getField('amount')
    },
    copyTypeField () {
      return this.getField('copy_type')
    },
    copyOpenedTradesField () {
      return this.getField('copy_opened_trades')
    },
    fixVolumeField () {
      return this.getField('setting_2')
    },
    percentVolumeField () {
      return this.getField('setting_3')
    },
    slField () {
      return this.getField('stop_loss')
    },
    tpField () {
      return this.getField('take_profit')
    },
    pauseField () {
      return this.getField('investor_pause')
    },
    formValuesCopy () {
      return this.changedForm.map(field => field.value)
    }
  },
  watch: {
    formValuesCopy (newValue, oldValue) {
      if ((JSON.stringify(newValue) !== JSON.stringify(oldValue)) && oldValue.length) {
        this.isChangeDisabled = false
      }
    }
  },
  created () {
    this.fetchForm('copyActionTrader')
  },
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-18' : Number(value) < 0 ? 'text-danger-18' : 'text-secondary-18'
    },
    dataValue (value, flag = null) {
      return `${Number(value).toFixed(2)} ${flag || this.account.currency}`
    },
    copyAction () {
      if (this.isGuest) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else {
        this.$store.dispatch('trading/actions/handler/copyAction', { ...this.formValues, id: this.trader.user_id })
      }
    },
    async stopCopying () {
      await this.$store.dispatch('trading/actions/handler/stopCopying', this.currentTraderInvestment.user_id)
      await this.fetchForm('copyActionTrader')
    },
    openFullScreenChart () {
      const elem = document.getElementById('chart-trader-container')
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }
}
</script>
