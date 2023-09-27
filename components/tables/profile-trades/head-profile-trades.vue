<template>
  <div class="custom-table-head -profile_trades">
    <div
      v-for="column in columns"
      :key="`head-column-${column[0]}`"
      class="custom-table-head-column"
      :class="[`-${source}`, `-${column[0]}`]"
    >
      <div
        v-if="column[0] === 'open_time'"
        class="d-flex align-items-center pointer"
        @click="toggleOpenTimeSort"
      >
        <lfx-icon-arrow-down
          v-if="openTimeSort === 'asc'"
          fill="#3b4b68"
          :style="{ width: '6px', height: '8px', marginRight: '6px' }"
        />
        <lfx-icon-arrow-up
          v-else
          fill="#3b4b68"
          :style="{ width: '6px', height: '8px', marginRight: '6px' }"
        />
        <span class="custom-table-head-column-value -open_time" v-text="column[1]" />
      </div>
      <span
        v-else
        class="custom-table-head-column-value"
        :class="`-${column[0]}`"
        v-text="column[1]"
      />
    </div>
  </div>
</template>

<script>
import LfxIconArrowDown from '~/components/icons/lfx-icon-arrow-down'
import LfxIconArrowUp from '~/components/icons/lfx-icon-arrow-up'
export default {
  name: 'HeadProfileTrades',
  components: { LfxIconArrowUp, LfxIconArrowDown },
  props: {
    source: {
      type: String,
      default: 'default'
    },
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      openTimeSort: 'asc'
    }
  },
  methods: {
    toggleOpenTimeSort () {
      this.openTimeSort = this.openTimeSort === 'asc' ? 'desc' : 'asc'
      this.$emit('open-time-sort', this.openTimeSort)
    }
  }
}
</script>
