<script setup>
import { ref, computed } from "vue";

const errorFailedToParse = ref(false);
const errorWrongFormat = ref(false);
const errorFromUrl = ref(false);
const isError = computed(
  () => errorFailedToParse.value || errorWrongFormat.value || errorFromUrl.value
);
const url = ref("");

const emit = defineEmits(["onUpload", "beforeUpload"]);

function resetErrors() {
  errorFailedToParse.value = false;
  errorWrongFormat.value = false;
  errorFromUrl.value = false;
}

function mapData(json) {
  const res = {};
  res.columns = json.columns.map((col, index) => ({
    index,
    label: col,
  }));
  res.rows = json.rows.map((row, index) => ({
    index,
    values: row,
  }));
  return res;
}

function readJSONFile(event) {
  if (!event.target.files[0]) {
    // reset data when no file selected
    emit("beforeUpload");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    emit("beforeUpload");
    resetErrors();

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
      const res = mapData(obj);
      columns = res.columns;
      rows = res.rows;
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

async function readFromServer(file) {
  resetErrors();

  const data = await fetch(file);
  const json = await data.json();

  const res = mapData(json);

  emit("onUpload", {
    columns: res.columns,
    rows: res.rows,
  });
}

async function handleUrlInput() {
  try {
    await readFromServer(url.value);
  } catch (err) {
    errorFromUrl.value = true;
    emit("beforeUpload");
  }
}
</script>

<template>
  <div
    class="table-data-input"
    :class="{
      'table-data-input--has-error': errorFailedToParse || errorWrongFormat,
    }"
  >
    <p>Choose a file with JSON data</p>
    <input accept=".json" type="file" @change="readJSONFile" />
  </div>

  <div class="table-data-input__buttons">
    <button @click="readFromServer('/huge_6MB.json')">Load 6MB</button>
    <button @click="readFromServer('/huge_18MB.json')">Load 18MB</button>

    <div class="table-data-input__url-field">
      <input v-model="url" type="text" placeholder="/huge_6MB.json" />
      <button @click="handleUrlInput">Load from url</button>
    </div>
  </div>

  <div class="table-data-input__error" v-if="isError">
    <p v-if="errorFailedToParse">
      Looks like this JSON file has a syntax error?!
    </p>
    <p v-if="errorWrongFormat">
      JSON file is valid, but looks like it has wrong format.
    </p>
    <p v-if="!errorFromUrl">Please check the file and try again. Thanks!</p>
    <p v-if="errorFromUrl">Seems like provided URL is invalid or incoming data is in wrong format</p>
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

  &__buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  &__url-field {
    border-radius: 8px;
    border: 1px solid gray;

    input {
      padding: 0.6em 1.2em;
      border: 0;
      appearance: none;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }
  }

  &__error {
    text-align: center;
    color: var(--error-color);
    padding-bottom: 16px;
  }
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
