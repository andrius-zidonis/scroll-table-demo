<script setup>
import { ref, computed } from "vue";

const errorFailedToParse = ref(false);
const errorWrongFormat = ref(false);
const isError = computed(
  () => errorFailedToParse.value || errorWrongFormat.value
);

const emit = defineEmits(["onUpload", "beforeUpload"]);

function readJSONFile(event) {
  if (!event.target.files[0]) {
    // reset data when no file selected
    emit("beforeUpload");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    emit("beforeUpload");
    errorFailedToParse.value = false;
    errorWrongFormat.value = false;

    let obj;
    let columns;
    let rows;

    try {
      obj = JSON.parse(event.target.result);
    } catch (err) {
      errorFailedToParse.value = true;
      return;
    }

    try {
      columns = obj.columns.map((col, index) => ({
        index,
        label: col,
      }));
      rows = obj.rows.map((row, index) => ({
        index,
        values: row,
      }));
    } catch (err) {
      errorWrongFormat.value = true;
      return;
    }

    emit("onUpload", {
      columns,
      rows,
    });
  };

  reader.readAsText(event.target.files[0]);
}
</script>

<template>
  <div
    class="table-data-input"
    :class="{ 'table-data-input--has-error': isError }"
  >
    <p>Choose a file with JSON data</p>
    <input accept=".json" type="file" @change="readJSONFile" />
  </div>

  <div class="table-data-input__error" v-if="isError">
    <p v-if="errorFailedToParse">
      Looks like this JSON file has a syntax error?!
    </p>
    <p v-if="errorWrongFormat">
      JSON file is valid, but looks like it has wrong format.
    </p>
    <p>Please check the file and try again. Thanks!</p>
  </div>
</template>

<style lang="scss" scoped>
.table-data-input {
  margin-bottom: 16px;

  &--has-error {
    input {
      border-color: var(--error-color);
    }
  }
}

.table-data-input__error {
  text-align: center;
  color: var(--error-color);
  padding-bottom: 16px;
}

input[type="file"] {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border: 1px dashed gray;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    border-color: #646cff;

    &::file-selector-button {
      background-color: #646cff;
    }
  }

  &::file-selector-button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s, background-color 0.25s;
  }
}
</style>