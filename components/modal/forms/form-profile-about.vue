<template>
  <div class="d-flex flex-column">
    <div class="modal-avatar">
      <img v-if="user.avatar_url" class="modal-avatar-picture" :src="user.avatar_url" alt>
      <div v-else class="modal-avatar-picture" />
      <b-form-file
        v-model="image"
        class="modal-avatar-button"
        variant="transparent-primary"
        placeholder=""
        :browse-text="$t('Загрузить картинку')"
      />
    </div>
    <b-form class="modal-form -profile_about" :class="direction" @submit="onSubmit">
      <b-form-group
        v-for="(field, key) in changedForm"
        :id="`group_${field.attribute}`"
        :key="key"
        :label="field.label"
        :label-for="field.attribute"
        :description="field.error"
        class="lfx-forms-input-title w-100"
        :dir="dir"
        :class="[getFieldClasses(field.attribute), `-${dir}`]"
        :style="getFieldStyles(field.attribute, field.value, field.error)"
      >
        <field-textarea
          v-if="field.attribute === 'about'"
          :id="field.attribute"
          v-model="field.value"
          :error="!!field.error"
          :is-separator="true"
          :min="field.string.min"
          :max="field.string.max"
          :placeholder="placeholder[field.attribute]"
          @change="setValue($event, field.attribute)"
        />
        <field-switch
          v-if="field.attribute === 'trader_enable'"
          :id="field.attribute"
          v-model="field.value"
          :type="field.type"
          :error="!!field.error"
          :info="info[field.attribute]"
          @change="setValue($event, field.attribute)"
        />
        <field-switch
          v-if="field.attribute === 'show_name'"
          :id="field.attribute"
          v-model="field.value"
          :type="field.type"
          :error="!!field.error"
          :info="info[field.attribute]"
          @change="setValue($event, field.attribute)"
        />
        <field-numeric
          v-if="field.type === 'text' && field.attribute !== 'about'"
          :id="field.attribute"
          v-model="field.value"
          :type="field.type"
          :error="!!field.error"
          :label="labels[field.attribute]"
          :digits="digits[field.attribute]"
          :min="range[field.attribute][0]"
          :max="range[field.attribute][1]"
          :counter="counter[field.attribute]"
          @change="setValue($event, field.attribute)"
        />
      </b-form-group>
      <div v-if="isButtonShown" :class="buttonClasses">
        <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
      </div>
    </b-form>
  </div>
</template>

<script>
import form from '~/mixins/form'
import FieldNumeric from '~/components/modal/fields/field-numeric'
import FieldSwitch from '~/components/modal/fields/field-switch'
import FieldTextarea from '~/components/modal/fields/field-textarea'
export default {
  name: 'FormProfileAbout',
  components: { FieldTextarea, FieldSwitch, FieldNumeric },
  mixins: [form],
  data () {
    return {
      image: null,
      labels: {
        trader_commission: '%',
        partner_commission: '%',
        min_investment: 'USD'
      },
      digits: {
        trader_commission: 0,
        partner_commission: 0,
        min_investment: 2
      },
      range: {
        trader_commission: [0, 100],
        partner_commission: [0, 100],
        min_investment: [0, Number.MAX_SAFE_INTEGER]
      },
      counter: {
        trader_commission: 1,
        partner_commission: 1,
        min_investment: 50
      }
    }
  },
  computed: {
    info () {
      return {
        trader_enable: this.$t('В случае исключения текущего счета из рейтинга трейдеров, его торговая история обнулится, а копирующие его счета, будут откреплены'),
        show_name: ''
      }
    },
    placeholder () {
      return {
        about: this.$t('Расскажите о себе, своем опыте и торговой стратегии и дайте рекомендации по минимальному депозиту и настройкам копирования')
      }
    }
  },
  watch: {
    image (newValue) {
      if (newValue) {
        this.$store.dispatch('dictionaries/actions/handler/saveAvatar', newValue)
      }
    }
  },
  methods: {
    getFieldClasses (id) {
      switch (id) {
        case 'trader_enable':
        case 'show_name':
          return 'd-flex align-items-center justify-content-between position-relative'
        default:
          return ''
      }
    },
    getFieldStyles (id, value, error) {
      switch (id) {
        case 'trader_enable':
          if (!value && !error) {
            return 'margin-bottom: 70px'
          } else if (!value && error) {
            return 'margin-bottom: 80px'
          } else if (value && error) {
            return 'margin-bottom: 30px'
          } else {
            return ''
          }
        case 'show_name':
          return error ? 'margin-bottom: 30px' : ''
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="scss">
  .modal-avatar {
    display: flex;
    flex-direction: column;
    padding: 20px 30px 0;

    &-picture {
      width: 200px;
      height: 200px;
      border-radius: 100px;
      background-color: #d9dce1;
      margin: 0 auto;
    }

    &-button {
      color: #3498db;
      text-decoration: underline;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
      margin-top: 20px;
      width: 160px;

      input {
        width: 160px;
      }

      .custom-file-label {
        border: none;
        width: 160px;
        left: 110px;

        @media screen and (max-width: 767px) {
          left: 270px;
        }

        @media screen and (max-width: 700px) {
          left: 240px;
        }

        @media screen and (max-width: 650px) {
          left: 215px;
        }

        @media screen and (max-width: 600px) {
          left: 190px;
        }

        @media screen and (max-width: 550px) {
          left: 165px;
        }

        @media screen and (max-width: 500px) {
          left: 145px;
        }

        @media screen and (max-width: 450px) {
          left: 120px;
        }

        @media screen and (max-width: 400px) {
          left: 100px;
        }

        &::after {
          display: block;
          background-color: transparent;
          color: #3498db;
          text-decoration: underline;
          cursor: pointer;

          &:hover {
            text-decoration: none;
          }
        }

        .form-file-text {
          display: none !important;
        }
      }

      &:hover {
        text-decoration: none;
      }
    }
  }

  #group_min_investment,
  #group_trader_enable__BV_label_,
  #group_show_name__BV_label_ {
    margin-bottom: 0 !important;
  }

  #group_trader_enable,
  #group_show_name {
    position: relative;

    small {
      position: absolute;
      width: 100%;
      left: 0;
    }
  }
</style>
