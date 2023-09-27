<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction">
    <b-form-group
      v-if="nameField"
      :label="nameField.label"
      :label-for="nameField.attribute"
      :description="nameField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="nameField.attribute"
        v-model="nameField.value"
        :type="nameField.type"
        :error="!!nameField.error"
        @change="setValue($event, nameField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="descriptionField"
      :label="descriptionField.label"
      :label-for="descriptionField.attribute"
      :description="descriptionField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-textarea
        :id="descriptionField.attribute"
        v-model="descriptionField.value"
        :error="!!descriptionField.error"
        :min="descriptionField.string.min"
        :max="descriptionField.string.max"
        @change="setValue($event, descriptionField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="typeField && typeFieldValues.length"
      :label="typeField.label"
      :label-for="typeField.attribute"
      :description="typeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="typeField.value"
        :values="typeFieldValues"
        :error="!!typeField.error"
        @change="setValue($event, typeField.attribute)"
      />
    </b-form-group>
    <div v-if="cashBackField && typeField.value === 'rebate'" class="d-flex align-items-center justify-content-between mb-4">
      <span :style="{ color: '#6d788a', fontSize: '13px' }" v-text="cashBackField.label" />
      <div>
        <b-form-group
          :description="cashBackField.error"
          :dir="dir"
          :class="['m-0', `-${dir}`]"
        >
          <field-switch
            :id="cashBackField.attribute"
            v-model="cashBackField.value"
            :type="cashBackField.type"
            :error="!!cashBackField.error"
            @change="setValue($event, cashBackField.attribute)"
          />
        </b-form-group>
      </div>
    </div>
    <b-form-group
      v-if="percentCashBackField && percentCashBackFieldValues.length && cashBackField.value === 1"
      :label="percentCashBackField.label"
      :label-for="percentCashBackField.attribute"
      :description="percentCashBackField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="percentCashBackField.value"
        :values="percentCashBackFieldValues"
        :error="!!percentCashBackField.error"
        @change="setValue($event, percentCashBackField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button class="w-100" variant="primary" @click="createCompany" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>
<script>
import moment from 'moment/moment'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
import form from '~/mixins/form'
import FieldTextarea from '~/components/modal/fields/field-textarea'
import FieldSwitch from '~/components/modal/fields/field-switch'
export default {
  name: 'FormPartnersCreateCompany',
  components: {
    FieldSwitch,
    FieldTextarea,
    FieldSelect,
    FieldText
  },
  mixins: [form],
  data () {
    return {
      moment
    }
  },
  computed: {
    nameField () {
      return this.getField('name')
    },
    descriptionField () {
      return this.getField('description')
    },
    typeField () {
      return this.getField('type')
    },
    typeFieldValues () {
      if (this.typeField && this.typeField.in && this.typeField.in.range) {
        return this.typeField.in.range.map(value => ({ text: value, value }))
      }

      return []
    },
    cashBackField () {
      return this.getField('cash_back')
    },
    percentCashBackField () {
      return this.getField('percent_cash_back')
    },
    percentCashBackFieldValues () {
      if (this.percentCashBackField && this.percentCashBackField.in && this.percentCashBackField.in.range) {
        return this.percentCashBackField.in.range.map(value => ({ text: `${value}%`, value }))
      }

      return []
    },
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    }
  },
  destroyed () {
    localStorage.removeItem('program-type')
  },
  methods: {
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    async createCompany () {
      await this.onSubmit()
      await this.toggleModal(false)
      setTimeout(() => this.fetchCampaigns(), 1000)
    },
    fetchCampaigns () {
      const settings = localStorage.getItem('partner-campaign-table-settings')
      if (settings) {
        this.$store.commit('partners/mutations/handler/SAVE_CAMPAIGN_TABLE_SETTINGS', {
          rootData: this.$store.state.partners.state.handler,
          data: settings
        })
      }
      this.$store.dispatch('partners/actions/handler/fetchPartnerCampaigns', this.affiliateDates)
    }
  }
}
</script>
