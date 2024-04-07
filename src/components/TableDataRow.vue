<script setup>
import { computed } from "vue"

const props = defineProps({
  data: Object,
  rowIndex: Number,
  rowHeight: Number,
})

const transformStyle = computed(() => {
    return `translateY(${props.rowIndex * props.rowHeight}px)`;
})
</script>

<template>
    <tr class="table-data-row" :style="{ transform: transformStyle }">
        <td class="table-data-row__cell" v-for="col in data" :key="col">
            <div class="table-data-row__inner">
                {{ col }}
            </div>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
.table-data-row {
    position: absolute;

    &:hover {
        .table-data-row__inner {
            background-color: var(--row-hover);
            color: var(--row-hover-color);
        }
    }
}

.table-data-row__cell {
    padding: 0;
    font-size: 14px;
}

.table-data-row__inner {
    box-sizing: border-box;
    padding: 2px 4px;
    width: 150px;
    background-color: transparent;
    transition: background-color 200ms, color 200ms;     
}
</style>