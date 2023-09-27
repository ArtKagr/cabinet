<template>
  <div class="popup-partners-table-settings">
    <div class="popup-partners-table-settings-head">
      <span class="popup-partners-table-settings-head-title" :class="`-${dir}`" v-text="$t('Настройка таблицы')" />
    </div>
    <div class="popup-partners-table-settings-body">
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('visits')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'visits')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'visits')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Клики')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('registrations')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'registrations')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'registrations')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Регистрация')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('conversion')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'conversion')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'conversion')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Конверсия')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('deposit')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'deposit')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'deposit')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Пополнение')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('withdrawal')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'withdrawal')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'withdrawal')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Вывод')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('deals')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'deals')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'deals')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Сделки')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('commission')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'commission')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'commission')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Комиссия')" />
      </div>
      <b-button variant="primary" @click="saveTableSettings" v-text="$t('Сохранить')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPartnersTableSettings',
  data () {
    return {
      tableColumnsCopy: []
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    tableColumns () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaignTableSettings']
    }
  },
  created () {
    const settings = localStorage.getItem('partner-campaign-table-settings')
    if (settings) {
      this.tableColumnsCopy = JSON.parse(settings)
    } else {
      this.tableColumnsCopy = JSON.parse(JSON.stringify(this.tableColumns))
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleColumn (process, column) {
      if (process === 'filter') {
        this.tableColumnsCopy = this.tableColumnsCopy.filter(item => item !== column)
      } else {
        this.tableColumnsCopy.push(column)
      }
    },
    saveTableSettings () {
      this.$store.commit('partners/mutations/handler/SAVE_CAMPAIGN_TABLE_SETTINGS', {
        rootData: this.$store.state.partners.state.handler,
        data: this.tableColumnsCopy
      })
      localStorage.setItem('partner-campaign-table-settings', JSON.stringify(this.tableColumnsCopy))
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-partners-table-settings {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px 28px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      padding: 0 20px 20px;

      &-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &-checkbox {
          width: 20px;
          height: 20px;
          fill: #d8dee6;

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          &.-fill {
            background-color: #3b3b68;
            border-radius: 5px;
          }
        }

        &-text {
          font-size: 12px;
          color: #6d788a;
        }
      }
    }
  }
</style>
