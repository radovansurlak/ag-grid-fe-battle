import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
	COLUMN_DEFS,
	DEFAULT_COL_DEF,
	TABLE_COUNT,
	ROW_COUNT,
	createTables,
} from "@fe-battle/mock-data";

const gridStyle = { height: "100vh", width: "100%" };
const BENCHMARK_ROUNDS = 20;

export default function App() {
	const [tables, setTables] = useState(() => createTables());

	const pendingRef = useRef(false);
	const startRef = useRef(0);
	const seedRef = useRef(0);

	const benchmarkRunningRef = useRef(false);
	const benchmarkResultsRef = useRef([]);
	const benchmarkTotalRef = useRef(0);

	const getRowId = useCallback((params) => params.data.id, []);

	const triggerUpdate = useCallback(() => {
		seedRef.current += 1;
		startRef.current = performance.now();
		pendingRef.current = true;

		setTables(() => createTables({ seedOffset: seedRef.current }));
	}, []);

	const startBenchmark = useCallback(() => {
		if (benchmarkRunningRef.current) return;

		benchmarkResultsRef.current = [];
		benchmarkTotalRef.current = 0;
		benchmarkRunningRef.current = true;

		triggerUpdate();
	}, [triggerUpdate]);

	useEffect(() => {
		if (!pendingRef.current) return;

		pendingRef.current = false;
		const start = startRef.current;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const duration = performance.now() - start;

				if (!benchmarkRunningRef.current) return;

				benchmarkResultsRef.current.push(duration);
				benchmarkTotalRef.current += duration;

				if (benchmarkResultsRef.current.length >= BENCHMARK_ROUNDS) {
					benchmarkRunningRef.current = false;

					const total = benchmarkTotalRef.current;
					const results = benchmarkResultsRef.current;
					const average = total / results.length;
					const formattedResults = results
						.map((v) => `${v.toFixed(1)} ms`)
						.join(", ");

					window.alert(
						`Benchmark complete (${BENCHMARK_ROUNDS} rerenders)\n` +
							`Total: ${total.toFixed(1)} ms\n` +
							`Average: ${average.toFixed(1)} ms\n` +
							`Rerender times: ${formattedResults}`
					);
					return;
				}

				triggerUpdate();
			});
		});
	}, [tables, triggerUpdate]);

	return (
		<div className="app">
			<header className="page-header">
				<div>
					<h1>React + AG Grid</h1>
					<p>
						{TABLE_COUNT} tables, {ROW_COUNT} rows each,{" "}
						{COLUMN_DEFS.length} columns per table.
					</p>
				</div>
				<div className="header-actions">
					<button
						className="trigger-button"
						type="button"
						onClick={triggerUpdate}
					>
						Update all tables
					</button>
					<button
						className="trigger-button"
						type="button"
						onClick={startBenchmark}
					>
						Run {BENCHMARK_ROUNDS}× benchmark
					</button>
					<div className="stats">
						Results appear in an alert once benchmarking finishes.
					</div>
				</div>
			</header>
			<div className="tables">
				{tables.map((table) => (
					<section key={table.id} className="table-card">
						<div className="table-title">Table {table.id}</div>
						<div className="ag-theme-alpine" style={gridStyle}>
							<AgGridReact
								rowData={table.rows}
								columnDefs={COLUMN_DEFS}
								defaultColDef={DEFAULT_COL_DEF}
								getRowId={getRowId}
								rowHeight={32}
							/>
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
