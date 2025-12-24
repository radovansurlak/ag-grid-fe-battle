<script>
	import { afterUpdate } from "svelte";
	import {
		COLUMN_DEFS,
		DEFAULT_COL_DEF,
		TABLE_COUNT,
		ROW_COUNT,
		createTables,
	} from "@fe-battle/mock-data";
	import Grid from "./components/Grid.svelte";

	const BENCHMARK_ROUNDS = 20;
	let tables = createTables();

	const columnDefs = COLUMN_DEFS;
	const defaultColDef = DEFAULT_COL_DEF;
	const gridStyle = "height: 100vh; width: 100%;";

	let pending = false;
	let startTime = 0;
	let seedOffset = 0;

	let benchmarking = false;
	let benchmarkResults = [];
	let benchmarkTotal = 0;

	const getRowId = (params) => params.data.id;

	function triggerUpdate() {
		seedOffset += 1;
		startTime = performance.now();
		pending = true;
		tables = createTables({ seedOffset });
	}

	function startBenchmark() {
		if (benchmarking) return;

		benchmarkResults = [];
		benchmarkTotal = 0;
		benchmarking = true;

		triggerUpdate();
	}

	afterUpdate(() => {
		if (!pending) return;
		pending = false;

		const start = startTime;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const duration = performance.now() - start;

				if (!benchmarking) return;

				benchmarkResults.push(duration);
				benchmarkTotal += duration;

				if (benchmarkResults.length >= BENCHMARK_ROUNDS) {
					benchmarking = false;

					const average = benchmarkTotal / benchmarkResults.length;
					const formattedResults = benchmarkResults
						.map((v) => `${v.toFixed(1)} ms`)
						.join(", ");

					window.alert(
						`Benchmark complete (${BENCHMARK_ROUNDS} rerenders)\n` +
							`Total: ${benchmarkTotal.toFixed(1)} ms\n` +
							`Average: ${average.toFixed(1)} ms\n` +
							`Rerender times: ${formattedResults}`
					);
					return;
				}

				triggerUpdate();
			});
		});
	});

</script>

<div class="app">
	<header class="page-header">
		<div>
			<h1>Svelte + AG Grid</h1>
			<p>
				{TABLE_COUNT} tables, {ROW_COUNT} rows each, {COLUMN_DEFS.length} columns per
				table.
			</p>
		</div>
		<div class="header-actions">
			<button
				class="trigger-button"
				type="button"
				on:click={triggerUpdate}
			>
				Update all tables
			</button>
			<button
				class="trigger-button"
				type="button"
				on:click={startBenchmark}
			>
				Run {BENCHMARK_ROUNDS}× benchmark
			</button>
			<div class="stats">
				Benchmark results surface in an alert once the run wraps.
			</div>
		</div>
	</header>

	<div class="tables">
		{#each tables as table (table.id)}
				<section class="table-card">
					<div class="table-title">Table {table.id}</div>
					<div class="grid-wrapper" style={gridStyle}>
						<Grid {columnDefs} rowData={table.rows} {defaultColDef} {getRowId} rowHeight={32} />
					</div>
				</section>
		{/each}
	</div>
</div>
