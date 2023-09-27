<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="finance_filter_calendar" :class="`-${dir}`">
      <b-form-group
        v-if="fromField"
        :label="fromField.label"
        :label-for="fromField.attribute"
        :description="fromField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
      >
        <field-text
          v-model="fromField.value"
          placeholder="DD.MM.YYYY"
          type="date"
          @change="setValue($event, fromField.attribute)"
        />
      </b-form-group>
      <b-form-group
        v-if="toField"
        :label="toField.label"
        :label-for="toField.attribute"
        :description="toField.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
      >
        <field-text
          v-model="toField.value"
          placeholder="DD.MM.YYYY"
          type="date"
          @change="setValue($event, toField.attribute)"
        />
      </b-form-group>
    </div>
    <b-form-group
      v-if="typeField"
      :label="typeField.label"
      :label-for="typeField.attribute"
      :description="typeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="typeField.value"
        :values="typeField.values"
        :error="!!typeField.error"
        @change="setValue($event, typeField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="currencyField"
      :label="currencyField.label"
      :label-for="currencyField.attribute"
      :description="currencyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="currencyField.value"
        :values="currencyField.values"
        :error="!!currencyField.error"
        @change="setValue($event, currencyField.attribute)"
      />
    </b-form-group>
    <div class="filter_settings">
      <span class="filter_settings-reset" @click="resetFilter" v-text="$t('Сбросить настройки фильтра')" />
      <span class="filter_settings-info" v-html="$t('Выбранным критериям соответствует <strong>{count}</strong> транзакций', { count: historyCount })" />
    </div>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button
        ref="form-button"
        type="submit"
        class="w-100 text-white-16"
        :style="{ width: '180px !important', margin: '0 auto', height: '50px' }"
        variant="primary"
        v-text="$t(buttonText)"
      />
    </div>
  </b-form>
</template>

<script>
import FieldSelect from '@/components/modal/fields/field-select'
import form from '~/mixins/form'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'FormFinanceHistory',
  components: { FieldText, FieldSelect },
  mixins: [form],
  data () {
    return {
      count: 1
    }
  },
  computed: {
    fromField () {
      return this.getField('from')
    },
    toField () {
      return this.getField('to')
    },
    typeField () {
      return this.getField('type')
    },
    currencyField () {
      return this.getField('currency')
    },
    historyCount () {
      return this.$store.getters['finance/getters/handler/getFinanceHistoryCount']
    }
  },
  methods: {
    resetFilter () {
      this.$store.dispatch('finance/actions/handler/fetchFinanceHistory')
      this.$store.dispatch('forms/actions/handler/toggleModal', false)
    }
  }
}
</script>
<style lang="scss">
  .finance_filter_calendar {
    display: flex;
    align-items: center;

    &.-ltr {
      div {
        &:nth-child(1) {
          margin-right: 10px;
        }
      }
    }

    &.-rtl {
      div {
        &:nth-child(1) {
          margin-left: 10px;
        }
      }
    }
  }
  .filter_settings {
    display: flex;
    flex-direction: column;

    &-reset {
      font-size: 14px;
      color: #3498db;
      cursor: pointer;
      margin-bottom: 15px;
      text-align: center;

      &:hover {
        color: #3B4B68;
      }
    }

    &-info {
      font-size: 12px;
      color: #8e9aac;
      margin-bottom: 5px;
      text-align: center;
    }
  }
</style>
