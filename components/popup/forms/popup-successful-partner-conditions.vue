<template>
  <div class="popup-successful-partner-conditions">
    <div class="popup-successful-partner-conditions-head">
      <span class="popup-successful-partner-conditions-head-title" :class="`-${dir}`" v-text="title.content" />
    </div>
    <div class="popup-successful-partner-conditions-body">
      <div class="popup-successful-partner-conditions-body-list">
        <span
          v-for="(item, key) in listOne.content"
          :key="key"
          class="popup-successful-partner-conditions-body-list-item"
          :class="[[0, 8].includes(key) ? '-title' : '', `-${dir}`]"
          v-html="item"
        />
      </div>
      <div class="popup-successful-partner-conditions-body-table">
        <div class="popup-successful-partner-conditions-body-table-row -head">
          <span
            v-for="(columnTitle, key) in table.content.head"
            :key="key"
            class="popup-successful-partner-conditions-body-table-row-column -head"
            :class="`-${dir}`"
            v-text="columnTitle"
          />
        </div>
        <div
          v-for="(row, key) in table.content.body"
          :key="key"
          class="popup-successful-partner-conditions-body-table-row"
        >
          <span
            v-for="(column, elem) in row"
            :key="elem"
            class="popup-successful-partner-conditions-body-table-row-column"
            :class="`-${dir}`"
            v-text="column"
          />
        </div>
      </div>
      <div class="popup-successful-partner-conditions-body-list">
        <span
          v-for="(item, key) in listTwo.content"
          :key="key"
          class="popup-successful-partner-conditions-body-list-item"
          :class="`-${dir}`"
          v-html="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupSuccessfulPartnerConditions',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    conditions () {
      return this.$store.getters['partners/getters/handler/getSuccessfulPartnerConditions']
    },
    types () {
      return this.conditions.map(item => item.type)
    },
    title () {
      return this.conditions.find(item => item.type === 'title')
    },
    listOne () {
      return this.conditions.find((item, index) => item.type === 'list' && index === 1)
    },
    table () {
      return this.conditions.find(item => item.type === 'table')
    },
    listTwo () {
      return this.conditions.find((item, index) => item.type === 'list' && index === 3)
    }
  }
}
</script>
<style lang="scss">
  .popup-successful-partner-conditions {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;

      &-title {
        line-height: 1;
        font-size: 20px;
        color: #3B4B68;
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      padding: 0 20px 20px 20px;

      &-list {
        display: flex;
        flex-direction: column;

        &-item {
          font-size: 14px;
          color: #8e9aac;
          margin-bottom: 10px;

          &.-rtl {
            text-align: right;
          }

          &.-title {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      &-table {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        &-row {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #b8d8f2;

          &.-head, &:last-child {
            border-bottom: none;
          }

          &-column {
            width: 50%;
            padding: 13px;
            font-size: 13px;
            color: #424b59;

            &.-rtl {
              text-align: right;
            }

            &.-head {
              padding: 0 !important;
            }

            &:first-child {
              padding: 13px 13px 13px 0;
            }
          }
        }
      }

      &-buttons {
        display: flex;
        align-items: center;
        margin-top: 18px;

        &-button {
          width: 50%;

          &.-ltr {
            &:nth-child(1) {
              margin-right: 10px;
            }
          }

          &.-rtl {
            &:nth-child(2) {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>
