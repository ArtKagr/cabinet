<template>
  <div class="popup-partners-table-settings">
    <div class="popup-partners-table-settings-head">
      <span class="popup-partners-table-settings-head-title" :class="`-${dir}`" v-text="$t('Настройка таблицы')" />
    </div>
    <div class="popup-partners-table-settings-body">
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('activity')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'activity')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'activity')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Активность')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('registration')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'registration')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'registration')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Регистрация')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('country')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'country')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'country')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="$t('Страна')" />
      </div>
      <div class="popup-partners-table-settings-body-row">
        <b-icon-check-square-fill
          v-if="tableColumnsCopy.includes('nickname')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'nickname')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'nickname')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="'Nickname'" />
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
          v-if="tableColumnsCopy.includes('cashback')"
          class="popup-partners-table-settings-body-row-checkbox -fill"
          :class="`-${dir}`"
          @click="toggleColumn('filter', 'cashback')"
        />
        <b-icon-square
          v-else
          class="popup-partners-table-settings-body-row-checkbox"
          :class="`-${dir}`"
          @click="toggleColumn('push', 'cashback')"
        />
        <span class="popup-partners-table-settings-body-row-text" v-text="'Cashback'" />
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
  name: 'PopupPartnersRefTableSettings',
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
      return this.$store.getters['partners/getters/handler/getPartnerReferralTableSettings']
    }
  },
  created () {
    const settings = localStorage.getItem('partner-referral-table-settings')
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
      this.$store.commit('partners/mutations/handler/SAVE_REFERRAL_TABLE_SETTINGS', {
        rootData: this.$store.state.partners.state.handler,
        data: this.tableColumnsCopy
      })
      localStorage.setItem('partner-referral-table-settings', JSON.stringify(this.tableColumnsCopy))
      this.togglePopup(false)
    }
  }
}
</script>
