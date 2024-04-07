<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import TableDataInput from "./TableDataInput.vue";
import TableDataSample from "./TableDataSample.vue";
import TableDataContainer from "./TableDataContainer.vue";

const columns = ref([]);
const rows = ref([]);
const rowIndexStart = ref(0);
const rowIndexEnd = ref(10);
const displayRows = computed(() =>
  rows.value.slice(rowIndexStart.value, rowIndexEnd.value)
);
const rowHeight = ref(25);

function updateData(data) {
  if (data.columns && data.rows) {
    columns.value = data.columns;
    rows.value = data.rows;
  }
}

function resetData() {
  columns.value = [];
  rows.value = [];
}
</script>

<template>
  <div class="app-header">
    <h1>Scroll Table</h1>

    <TableDataInput @onUpload="updateData" @beforeUpload="resetData" />

    <p v-if="rows.length > 0">Total rows: {{ rows.length }}</p>
  </div>

  <div class="table-data">
    <TableDataContainer
      :columns="columns"
      :rows="displayRows"
      :total="rows.length"
      :row-height="rowHeight"
    />
    <TableDataSample v-if="rows.length === 0" />
  </div>
</template>

<style lang="scss" scoped>
.table-data {
  text-align: left;
  flex-grow: 1;
  font-family: monospace;
  max-width: 100%;
  overflow: scroll;
  position: relative;
}
</style>
