<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction">
    <div class="form-partners-reg-rep-body">
      <b-form-group
        v-if="nameField"
        :label="nameField.label"
        :label-for="nameField.attribute"
        :description="nameField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
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
        v-if="emailField"
        :label="emailField.label"
        :label-for="emailField.attribute"
        :description="emailField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="emailField.attribute"
          v-model="emailField.value"
          :type="emailField.type"
          :error="!!emailField.error"
          @change="setValue($event, emailField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="phoneField"
        :label="phoneField.label"
        :label-for="phoneField.attribute"
        :description="phoneField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="phoneField.attribute"
          v-model="phoneField.value"
          :type="phoneField.type"
          :error="!!phoneField.error"
          @change="setValue($event, phoneField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="telegramField"
        :label="telegramField.label"
        :label-for="telegramField.attribute"
        :description="telegramField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="telegramField.attribute"
          v-model="telegramField.value"
          :type="telegramField.type"
          :error="!!telegramField.error"
          @change="setValue($event, telegramField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="countryField"
        :label="countryField.label"
        :label-for="countryField.attribute"
        :description="countryField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-select
          :id="id"
          v-model="countryField.value"
          :values="countryFieldValues"
          :error="!!countryField.error"
          @change="setValue($event, countryField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="cityField"
        :label="cityField.label"
        :label-for="cityField.attribute"
        :description="cityField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="cityField.attribute"
          v-model="cityField.value"
          :type="cityField.type"
          :error="!!cityField.error"
          @change="setValue($event, cityField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="isRegulatedField"
        :label="isRegulatedField.label"
        :label-for="isRegulatedField.attribute"
        :description="isRegulatedField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="isRegulatedField.attribute"
          v-model="isRegulatedField.value"
          :type="isRegulatedField.type"
          :error="!!isRegulatedField.error"
          @change="setValue($event, isRegulatedField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="isRestrictionsField"
        :label="isRestrictionsField.label"
        :label-for="isRestrictionsField.attribute"
        :description="isRestrictionsField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="isRestrictionsField.attribute"
          v-model="isRestrictionsField.value"
          :type="isRestrictionsField.type"
          :error="!!isRestrictionsField.error"
          @change="setValue($event, isRestrictionsField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="paymentSystemsField"
        :label="paymentSystemsField.label"
        :label-for="paymentSystemsField.attribute"
        :description="paymentSystemsField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="paymentSystemsField.attribute"
          v-model="paymentSystemsField.value"
          :type="paymentSystemsField.type"
          :error="!!paymentSystemsField.error"
          @change="setValue($event, paymentSystemsField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="languagesField"
        :label="languagesField.label"
        :label-for="languagesField.attribute"
        :description="languagesField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="languagesField.attribute"
          v-model="languagesField.value"
          :type="languagesField.type"
          :error="!!languagesField.error"
          @change="setValue($event, languagesField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="averageSalaryField"
        :label="averageSalaryField.label"
        :label-for="averageSalaryField.attribute"
        :description="averageSalaryField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="averageSalaryField.attribute"
          v-model="averageSalaryField.value"
          :type="averageSalaryField.type"
          :error="!!averageSalaryField.error"
          @change="setValue($event, averageSalaryField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="officeField"
        :label="officeField.label"
        :label-for="officeField.attribute"
        :description="officeField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="officeField.attribute"
          v-model="officeField.value"
          type="text"
          :error="!!officeField.error"
          @change="setValue($event, officeField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="isBrokerField"
        :label="isBrokerField.label"
        :label-for="isBrokerField.attribute"
        :description="isBrokerField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="isBrokerField.attribute"
          v-model="isBrokerField.value"
          :type="isBrokerField.type"
          :error="!!isBrokerField.error"
          @change="setValue($event, isBrokerField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="companyRegistrationField"
        :label="companyRegistrationField.label"
        :label-for="companyRegistrationField.attribute"
        :description="companyRegistrationField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="companyRegistrationField.attribute"
          v-model="companyRegistrationField.value"
          :type="companyRegistrationField.type"
          :error="!!companyRegistrationField.error"
          @change="setValue($event, companyRegistrationField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="taxationField"
        :label="taxationField.label"
        :label-for="taxationField.attribute"
        :description="taxationField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="taxationField.attribute"
          v-model="taxationField.value"
          :type="taxationField.type"
          :error="!!taxationField.error"
          @change="setValue($event, taxationField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="messengersField"
        :label="messengersField.label"
        :label-for="messengersField.attribute"
        :description="messengersField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="messengersField.attribute"
          v-model="messengersField.value"
          :type="messengersField.type"
          :error="!!messengersField.error"
          @change="setValue($event, messengersField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="facebookField"
        :label="facebookField.label"
        :label-for="facebookField.attribute"
        :description="facebookField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="facebookField.attribute"
          v-model="facebookField.value"
          :type="facebookField.type"
          :error="!!facebookField.error"
          @change="setValue($event, facebookField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="advertisingField"
        :label="advertisingField.label"
        :label-for="advertisingField.attribute"
        :description="advertisingField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="advertisingField.attribute"
          v-model="advertisingField.value"
          :type="advertisingField.type"
          :error="!!advertisingField.error"
          @change="setValue($event, advertisingField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="competitorsField"
        :label="competitorsField.label"
        :label-for="competitorsField.attribute"
        :description="competitorsField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="competitorsField.attribute"
          v-model="competitorsField.value"
          :type="competitorsField.type"
          :error="!!competitorsField.error"
          @change="setValue($event, competitorsField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="businessContactsField"
        :label="businessContactsField.label"
        :label-for="businessContactsField.attribute"
        :description="businessContactsField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="businessContactsField.attribute"
          v-model="businessContactsField.value"
          :type="businessContactsField.type"
          :error="!!businessContactsField.error"
          @change="setValue($event, businessContactsField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="marketingField"
        :label="marketingField.label"
        :label-for="marketingField.attribute"
        :description="marketingField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="marketingField.attribute"
          v-model="marketingField.value"
          :type="marketingField.type"
          :error="!!marketingField.error"
          @change="setValue($event, marketingField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="activeClientCountField"
        :label="activeClientCountField.label"
        :label-for="activeClientCountField.attribute"
        :description="activeClientCountField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="activeClientCountField.attribute"
          v-model="activeClientCountField.value"
          :type="activeClientCountField.type"
          :error="!!activeClientCountField.error"
          @change="setValue($event, activeClientCountField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="subPartnersField"
        :label="subPartnersField.label"
        :label-for="subPartnersField.attribute"
        :description="subPartnersField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="subPartnersField.attribute"
          v-model="subPartnersField.value"
          :type="subPartnersField.type"
          :error="!!subPartnersField.error"
          @change="setValue($event, subPartnersField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="depositField"
        :label="depositField.label"
        :label-for="depositField.attribute"
        :description="depositField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="depositField.attribute"
          v-model="depositField.value"
          :type="depositField.type"
          :error="!!depositField.error"
          @change="setValue($event, depositField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="optionsField"
        :label="optionsField.label"
        :label-for="optionsField.attribute"
        :description="optionsField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-select-checkbox
          :value="optionsField.value"
          :values="optionsField.values"
          :error="!!optionsField.error"
          @change="setValue($event, optionsField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="optionsOtherField"
        :label="optionsOtherField.label"
        :label-for="optionsOtherField.attribute"
        :description="optionsOtherField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="optionsOtherField.attribute"
          v-model="optionsOtherField.value"
          :type="optionsOtherField.type"
          :error="!!optionsOtherField.error"
          @change="setValue($event, optionsOtherField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="planToGenerateField"
        :label="planToGenerateField.label"
        :label-for="planToGenerateField.attribute"
        :description="planToGenerateField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-text
          :id="planToGenerateField.attribute"
          v-model="planToGenerateField.value"
          :type="planToGenerateField.type"
          :error="!!planToGenerateField.error"
          @change="setValue($event, planToGenerateField.attribute)"
        />
      </b-form-group>
      <div v-if="courseField" class="d-flex align-items-center justify-content-between">
        <span :style="{ color: '#8e9aac', fontSize: '13px' }" v-text="courseField.label" />
        <div>
          <b-form-group
            :description="courseField.error"
            :dir="dir"
            :class="['m-0', `-${dir}`]"
          >
            <field-switch
              :id="courseField.attribute"
              v-model="courseField.value"
              :type="courseField.type"
              :error="!!courseField.error"
              @change="setValue($event, courseField.attribute)"
            />
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="form-partners-reg-rep-block">
      <b-form-group
        v-if="repCompanyNameField"
        :label="repCompanyNameField.label"
        :label-for="repCompanyNameField.attribute"
        :description="repCompanyNameField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', `-${dir}`]"
      >
        <field-textarea
          :id="repCompanyNameField.attribute"
          v-model="repCompanyNameField.value"
          :error="!!repCompanyNameField.error"
          :min="0"
          :max="1000"
          @change="setValue($event, repCompanyNameField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="workPeriodField"
        :label="workPeriodField.label"
        :label-for="workPeriodField.attribute"
        :description="workPeriodField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
      >
        <field-text
          :id="workPeriodField.attribute"
          v-model="workPeriodField.value"
          :type="workPeriodField.type"
          :error="!!workPeriodField.error"
          @change="setValue($event, workPeriodField.attribute)"
        />
      </b-form-group>
    </div>
    <div class="form-partners-reg-rep-footer">
      <b-form-group
        v-if="infoField"
        :label="infoField.label"
        :label-for="infoField.attribute"
        :description="infoField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
      >
        <field-textarea
          :id="infoField.attribute"
          v-model="infoField.value"
          :error="!!infoField.error"
          :min="0"
          :max="1000"
          @change="setValue($event, infoField.attribute)"
        />
      </b-form-group>
    </div>
    <div v-if="isButtonShown" class="form-partners-reg-rep-button">
      <b-button class="w-100" variant="primary" @click="createApp" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import FieldSelect from '@/components/modal/fields/field-select'
import FieldText from '@/components/modal/fields/field-text'
import FieldSwitch from '~/components/modal/fields/field-switch'
import FieldTextarea from '~/components/modal/fields/field-textarea'
import form from '~/mixins/form'
import FieldSelectCheckbox from '~/components/modal/fields/field-select-checkbox'
export default {
  name: 'FormPartnersRegRep',
  components: {
    FieldSelectCheckbox,
    FieldTextarea,
    FieldSwitch,
    FieldText,
    FieldSelect
  },
  mixins: [form],
  computed: {
    nameField () {
      return this.getField('name')
    },
    emailField () {
      return this.getField('email')
    },
    phoneField () {
      return this.getField('phone')
    },
    telegramField () {
      return this.getField('telegram')
    },
    countryField () {
      return this.getField('country')
    },
    countryFieldValues () {
      if (this.countryField && this.countryField.in && this.countryField.in.range) {
        return Object.entries(this.countryField.in.range).map(item => ({ text: item[1], value: item[0] }))
      }
      return []
    },
    cityField () {
      return this.getField('city')
    },
    isRegulatedField () {
      return this.getField('is_regulated')
    },
    isRestrictionsField () {
      return this.getField('is_restrictions')
    },
    paymentSystemsField () {
      return this.getField('payment_systems')
    },
    languagesField () {
      return this.getField('languages')
    },
    averageSalaryField () {
      return this.getField('average_salary')
    },
    officeField () {
      return this.getField('office')
    },
    isBrokerField () {
      return this.getField('is_broker')
    },
    companyRegistrationField () {
      return this.getField('company_registration')
    },
    taxationField () {
      return this.getField('taxation')
    },
    messengersField () {
      return this.getField('messengers')
    },
    facebookField () {
      return this.getField('facebook')
    },
    advertisingField () {
      return this.getField('advertising')
    },
    competitorsField () {
      return this.getField('competitors')
    },
    businessContactsField () {
      return this.getField('business_contacts')
    },
    marketingField () {
      return this.getField('marketing')
    },
    activeClientCountField () {
      return this.getField('active_client_count')
    },
    subPartnersField () {
      return this.getField('sub_partners')
    },
    depositField () {
      return this.getField('deposit')
    },
    optionsField () {
      return this.getField('options')
    },
    optionsFieldValues () {
      if (this.optionsField && this.optionsField.in && this.optionsField.in.range) {
        return this.optionsField.in.range
      }
      return []
    },
    optionsOtherField () {
      return this.getField('options_other')
    },
    planToGenerateField () {
      return this.getField('plan_to_generate')
    },
    courseField () {
      return this.getField('course')
    },
    repCompanyNameField () {
      return this.getField('representative_company_name')
    },
    workPeriodField () {
      return this.getField('work_period')
    },
    infoField () {
      return this.getField('info')
    }
  },
  methods: {
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    createApp () {
      this.onSubmit()
      if (this.isFormSuccess) {
        this.toggleModal(false)
      }
    }
  }
}
</script>
<style lang="scss">
  .form-partners-reg-rep {
    &-body {
      padding: 0 30px 20px;
    }

    &-block {
      padding: 20px 30px;
      border-top: 1px solid #d9dce1;
      border-bottom: 1px solid #d9dce1;
    }

    &-footer {
      padding: 20px 30px;
      border-bottom: 1px solid #d9dce1;
    }

    &-button {
      padding: 20px 30px;
    }
  }
</style>
