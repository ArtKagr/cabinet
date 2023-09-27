<template>
  <b-form :id="`form_${formTitle}`" class="modal-form p-0" :class="direction" @submit="onSubmit">
    <div class="popup-trades-change-body">
      <div class="popup-trades-change-body-head">
        <img v-if="investment.avatar_url" class="popup-trades_history_investment-head-logo" :src="investment.avatar_url" alt>
        <div v-else class="popup-trades_history_investment-head-logo">
          <span v-text="investment.avatar_name" />
        </div>
        <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="investment.symbol" />
      </div>
      <div class="popup-trades-change-body-label">
        <span class="popup-trades-change-body-label-title" v-text="$t('Точка входа')" />
        <span class="popup-trades-change-body-label-value" v-text="investment.open_price" />
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
      <div class="popup-trades-change-body-data">
        <div class="popup-trades-change-body-data-values">
          <div class="popup-trades-change-body-data-values-item">
            <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая доходность')" />
            <bdi class="popup-trades-change-body-data-values-item-value" :class="[`-${dir}`, dataClass(investment.current_price.replace(/%/gi, ''))]" v-text="investment.current_price" />
          </div>
          <div class="popup-trades-change-body-data-values-item">
            <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая прибыль')" />
            <bdi class="popup-trades-change-body-data-values-item-value" :class="[`-${dir}`, dataClass(investment.changedProfit)]" v-text="dataValue(investment.changedProfit)" />
          </div>
        </div>
        <div class="popup-trades-change-body-data-collapse">
          <div v-b-toggle:trades-investment-change class="popup-trades-change-body-data-collapse-chevron" :class="`-${dir}`">
            <lfx-icon-chevron-down class="when-closed" />
            <lfx-icon-chevron-down class="when-open rotate_180" />
          </div>
          <span v-b-toggle.trades-investment-change class="popup-trades-change-body-data-collapse-title" v-text="$t('Настройки копирования')" />
        </div>
        <b-collapse id="trades-investment-change">
          <div v-if="copyTypeField" class="popup-trades-change-body-data-conditions">
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
            <div class="popup-trades-change-body-data-conditions-row">
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
    </div>
    <div v-if="isButtonShown" :class="buttonClasses" class="form-copy_action-buttons">
      <b-button
        ref="form-button"
        type="submit"
        class="w-100 text-white-16"
        :disabled="isChangeDisabled"
        variant="primary"
        v-text="$t(buttonText)"
      />
      <b-button
        class="w-100 text-white-16"
        variant="danger"
        @click="stopCopy"
        v-text="$t('Остановить копирование')"
      />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import modal from '~/mixins/modal'
import FieldNumeric from '~/components/modal/fields/field-numeric'
import FieldSelect from '~/components/modal/fields/field-select'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'FormCopyAction',
  components: { LfxIconChevronDown, FieldSelect, FieldNumeric },
  mixins: [form, modal],
  data () {
    return {
      isChangeDisabled: true
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    investment () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    },
    involvedFunds () {
      return ((this.amountField.value * 100) / this.account.balance).toFixed(2)
    },
    amountField () {
      return this.getField('amount')
    },
    copyTypeField () {
      return this.getField('copy_type')
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
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-18' : Number(value) < 0 ? 'text-danger-18' : 'text-secondary-18'
    },
    dataValue (value, flag = null) {
      return `${Number(value).toFixed(2)} ${flag || this.account.currency}`
    },
    async stopCopy () {
      await this.$store.dispatch('trading/actions/handler/stopCopying', this.investment.user_id)
      await this.closeModal()
    }
  }
}
</script>
<style lang="scss">
  .form-copy_action-buttons {
    padding: 0 20px 20px;

    button {
      &:nth-child(1) {
        margin-bottom: 20px;
      }
    }
  }
</style>
