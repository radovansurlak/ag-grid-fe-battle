<script setup>
import { nextTick, shallowRef } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import {
  COLUMN_DEFS,
  DEFAULT_COL_DEF,
  TABLE_COUNT,
  ROW_COUNT,
  createTables,
} from "@fe-battle/mock-data";

const BENCHMARK_ROUNDS = 20;

const tables = shallowRef(createTables());

const gridStyle = { height: "100vh", width: "100%" };

let seedOffset = 0;
let benchmarking = false;

const getRowId = (params) => params.data.id;

const raf = () => new Promise((r) => requestAnimationFrame(r));

async function flushToPaint() {
  await nextTick();
  await raf();
  await raf();
}

function triggerUpdate() {
  seedOffset += 1;
  tables.value = createTables({ seedOffset });
}

async function measureOnce() {
  const start = performance.now();
  triggerUpdate();
  await flushToPaint();
  return performance.now() - start;
}

async function startBenchmark() {
  if (benchmarking) return;
  benchmarking = true;

  const results = [];
  let total = 0;

  for (let i = 0; i < BENCHMARK_ROUNDS; i++) {
    if (!benchmarking) break;

    const duration = await measureOnce();
    results.push(duration);
    total += duration;
  }

  benchmarking = false;

  const average = total / results.length;
  const formattedResults = results
    .map((v) => `${v.toFixed(1)} ms`)
    .join(", ");

  window.alert(
    `Benchmark complete (${results.length} rerenders)\n` +
    `Total: ${total.toFixed(1)} ms\n` +
    `Average: ${average.toFixed(1)} ms\n` +
    `Rerender times: ${formattedResults}`
  );
}
</script>

<template>
  <div class="app">
    <header class="page-header">
      <div>
        <h1>Vue 3 + AG Grid</h1>
        <p>
          {{ TABLE_COUNT }} tables,
          {{ ROW_COUNT }} rows each,
          {{ COLUMN_DEFS.length }} columns per table.
        </p>
      </div>

      <div class="header-actions">
        <button class="trigger-button" type="button" @click="triggerUpdate">
          Update all tables
        </button>

        <button class="trigger-button" type="button" @click="startBenchmark">
          Run {{ BENCHMARK_ROUNDS }}× benchmark
        </button>

        <div class="stats">
          Benchmark results appear in an alert once the run completes.
        </div>
      </div>
    </header>

    <div class="tables">
      <section v-for="table in tables" :key="table.id" class="table-card">
        <div class="table-title">Table {{ table.id }}</div>

        <AgGridVue class="ag-theme-alpine" :style="gridStyle" :rowData="table.rows" :columnDefs="COLUMN_DEFS"
          :defaultColDef="DEFAULT_COL_DEF" :getRowId="getRowId" :rowHeight="32" />
      </section>
    </div>
  </div>
</template>