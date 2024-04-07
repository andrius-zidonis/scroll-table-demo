<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import TableDataInput from "./TableDataInput.vue";

const columns = ref([]);
const rows = ref([]);

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
</template>
