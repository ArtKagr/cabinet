<template>
  <div class="p-4">
    <div class="d-flex">
      <div class="d-flex flex-column mr-4" style="width: 200px">
        <b-button variant="primary" class="mb-4" v-text="'Action button'" />
        <b-button variant="dark-primary" class="mb-4" v-text="'Action button'" />
        <b-button variant="secondary" class="mb-4" v-text="'Action button'" />
        <b-button variant="light-secondary" class="mb-4" v-text="'Action button'" />
        <b-button variant="success" class="mb-4" v-text="'Action button'" />
        <b-button variant="danger" class="mb-4" v-text="'Action button'" />
        <b-button variant="info" class="mb-4" v-text="'Action button'" />
        <b-button variant="warning" class="mb-4" v-text="'Action button'" />
      </div>
      <div class="d-flex flex-column mr-4" style="width: 200px">
        <b-button variant="outline-primary" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-dark-primary" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-secondary" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-light-secondary" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-success" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-danger" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-info" class="mb-4" v-text="'Action button'" />
        <b-button variant="outline-warning" class="mb-4" v-text="'Action button'" />
      </div>
      <div class="d-flex flex-column mr-4" style="width: 200px">
        <b-button variant="primary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="dark-primary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="secondary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="light-secondary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="success-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="danger-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="info-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="warning-badge" class="mb-4" v-text="'Custom badge'" />
      </div>
      <div class="d-flex flex-column" style="width: 200px">
        <b-button variant="outline-primary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-dark-primary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-secondary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-light-secondary-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-success-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-danger-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-info-badge" class="mb-4" v-text="'Custom badge'" />
        <b-button variant="outline-warning-badge" class="mb-4" v-text="'Custom badge'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Partner',
  middleware: ['auth']
}
</script>
