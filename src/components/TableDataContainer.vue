<script setup>
import TableDataRow from "./TableDataRow.vue";

defineProps({
  columns: Array,
  rows: Array,
  total: Number,
  rowHeight: Number,
});
</script>

<template>
  <table class="table-data-container__header">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.index">
          <div>
            {{ col.label }}
          </div>
        </th>
      </tr>
    </thead>
  </table>
  <table>
    <tbody :height="total * rowHeight">
      <TableDataRow
        v-for="row in rows"
        :key="row.index"
        :data="row.values"
        :row-index="row.index"
        :row-height="rowHeight"
      />
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table-data-container__header {
  th {
    padding: 0;
    font-size: 14px;

    div {
      box-sizing: border-box;
      padding: 2px 4px;
      width: 150px;
    }
  }
}

table {
  border-collapse: collapse;
}

tbody {
  position: relative;
}
</style>
