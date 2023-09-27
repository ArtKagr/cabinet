<template>
  <div class="form-mt-vps">
    <div class="form-mt-vps-info">
      <div class="form-mt-vps-info-row">
        <div class="form-mt-vps-info-row-column -w_auto">
          <span class="form-mt-vps-info-row-column-title" v-text="'OS'" />
          <span class="form-mt-vps-info-row-column-text" v-text="'Windows Server 2012'" />
        </div>
      </div>
      <div class="form-mt-vps-info-row">
        <div class="form-mt-vps-info-row-column">
          <span class="form-mt-vps-info-row-column-title" v-text="'CPU'" />
          <span class="form-mt-vps-info-row-column-text" v-text="'1100 MHz'" />
        </div>
        <div class="form-mt-vps-info-row-column">
          <span class="form-mt-vps-info-row-column-title" v-text="'RAM'" />
          <span class="form-mt-vps-info-row-column-text" v-text="'1024 MB'" />
        </div>
        <div class="form-mt-vps-info-row-column">
          <span class="form-mt-vps-info-row-column-title" v-text="'HDD'" />
          <span class="form-mt-vps-info-row-column-text" v-text="'25 Gb'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormMtVpsBuy'
}
</script>
<style lang="scss">
  .form-mt-vps {
    padding: 0 20px 20px;

    &-info {
      display: flex;
      flex-direction: column;
      background-color: #ededed;
      border-radius: 3px;
      margin-bottom: 20px;

      &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-column {
          display: flex;
          flex-direction: column;
          width: 100px;
          padding: 10px;

          &.-w_auto {
            width: auto;
          }

          &-title {
            font-size: 12px;
            color: #8e9aac;
          }

          &-text {
            font-size: 15px;
            line-height: 1;
            color: #3B4B68;
          }
        }
      }
    }
  }
</style>
