<template>
  <div class="sample-data">
    <p>JSON data format should look like this:</p>
    <pre>
{
    "columns": [
        "column1",
        "column2",
        ...
    ],
    rows: [
        {
        "column1": "value1_1",
        "column2": "value1_2",
        },
        {
        "column1": "value2_1",
        "column2": "value2_2",
        },
        ...
    ],
}
        </pre
    >
  </div>
</template>

<style scoped>
.sample-data {
  max-width: 310px;
  margin: auto;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
</style>
