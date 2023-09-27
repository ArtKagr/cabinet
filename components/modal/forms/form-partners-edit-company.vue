<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction">
    <div v-if="nameField" class="form-partners-edit-company-head">
      <span class="form-partners-edit-company-head-value" :class="`-${dir}`" v-text="nameField.value" />
      <span class="form-partners-edit-company-head-title" :class="`-${dir}`" v-text="nameField.label" />
    </div>
    <div class="form-partners-edit-company-body">
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
        :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
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
    </div>
    <div v-if="isButtonShown" class="form-partners-edit-company-button">
      <b-button class="w-100" variant="primary" @click="editCompany" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import moment from 'moment'
import FieldText from '@/components/modal/fields/field-text'
import form from '~/mixins/form'
import FieldTextarea from '~/components/modal/fields/field-textarea'
export default {
  name: 'FormPartnersEditCompany',
  components: {
    FieldTextarea,
    FieldText
  },
  mixins: [form],
  computed: {
    fields () {
      return this.changedForm.map(field => field.attribute)
    },
    clientIdField () {
      return this.getField('client_id')
    },
    nameField () {
      return this.getField('name')
    },
    typeField () {
      return this.getField('type')
    },
    activeField () {
      return this.getField('active')
    },
    cashBackField () {
      return this.getField('cash_back')
    },
    percentCashField () {
      return this.getField('percent_cash_back')
    },
    descriptionField () {
      return this.getField('description')
    },
    dateCreatedField () {
      return this.getField('date_created')
    },
    cpsAgreementField () {
      return this.getField('cps_agreement')
    },
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    }
  },
  methods: {
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    async editCompany () {
      this.$store.dispatch('forms/actions/handler/saveForm', {
        formId: this.formId,
        values: {
          name: this.nameField.value,
          description: this.descriptionField.value,
          client_id: this.clientIdField.value
        }
      })
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
<style lang="scss">
  .form-partners-edit-company {

    &-head {
      display: flex;
      flex-direction: column;
      padding: 20px 30px;
      background-color: #eff1f5;
      margin-bottom: 20px;

      &-value {
        font-size: 18px;
        color: #3B4B68;
        line-height: 1;
        font-weight: 500;

        &.-rtl {
          text-align: right;
        }
      }

      &-title {
        font-size: 12px;
        color: #8e9aac;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      padding: 0 30px;
    }

    &-button {
      padding: 30px;
    }
  }
</style>
