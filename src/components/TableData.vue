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

const visibleRowCount = ref(0);
const indexStep = ref(10);
const lastKnownScrollPosition = ref(0);
const ticking = ref(false);

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

function calculateVisibleRows() {
  let containerHeight = document.getElementById("table-data").clientHeight;
  visibleRowCount.value = Math.ceil(
    (containerHeight - rowHeight.value) / rowHeight.value
  ); // minus header row
  const extraBuffer = Math.floor(indexStep.value / 2);
  rowIndexEnd.value = visibleRowCount.value + extraBuffer;
}

function evaluateDisplayRows(scrollTop) {
  const alreadyScrollCount = Math.floor(scrollTop / rowHeight.value);
  const firstIndex =
    alreadyScrollCount >= indexStep.value
      ? alreadyScrollCount - Math.floor(indexStep.value / 2)
      : 0;
  const lastIndex = firstIndex + visibleRowCount.value + indexStep.value;

  // console.debug(scrollTop, alreadyScrollCount, firstIndex, visibleRowCount.value, lastIndex);

  // this will update computed displayRows value
  rowIndexStart.value = firstIndex;
  rowIndexEnd.value = lastIndex;
}

function handleScroll(event) {
  lastKnownScrollPosition.value = event.target.scrollTop;

  if (!ticking.value) {
    window.requestAnimationFrame(() => {
      evaluateDisplayRows(lastKnownScrollPosition.value);
      ticking.value = false;
    });

    ticking.value = true;
  }
}

onMounted(() => {
  calculateVisibleRows();
  document
    .getElementById("table-data")
    .addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document
    .getElementById("table-data")
    .removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="app-header">
    <h1>Scroll Table</h1>

    <TableDataInput @onUpload="updateData" @beforeUpload="resetData" />

    <p v-if="rows.length > 0">Total rows: {{ rows.length }}</p>
  </div>

  <div id="table-data" class="table-data">
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

  &::after {
    content: "";
    display: block;
    background: linear-gradient(0deg, var(--bg-color), transparent);
    width: 100%;
    position: sticky;
    left: 0;
    bottom: 0px;
    height: 50px;
    margin-top: -50px;
    pointer-events: none;
  }
}
</style>
