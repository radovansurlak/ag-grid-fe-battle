<script>
	import { onDestroy, onMount } from "svelte";
	import {
		createGrid,
		ModuleRegistry,
		ClientSideRowModelModule
	} from "ag-grid-community";

	// Register AG Grid Modules
	ModuleRegistry.registerModules([ClientSideRowModelModule]);

	export let columnDefs = [];
	export let rowData = [];
	export let defaultColDef = {};
	export let getRowId = () => {};
	export let gridStyle = "height: 100%; width: 100%;";
	export let rowHeight = 32;

	let gridDiv = null;
	let gridApi;

	onMount(() => {
		const gridOptions = {
			columnDefs,
			rowData,
			defaultColDef,
			getRowId,
			rowHeight
		};

		if (gridDiv) {
			gridApi = createGrid(gridDiv, gridOptions);
		}
	});

	onDestroy(() => {
		gridApi?.destroy();
	});

	$: if (gridApi) {
		if (gridApi.setGridOption) gridApi.setGridOption("rowData", rowData);
		else if (gridApi.setRowData) gridApi.setRowData(rowData);
	}
</script>

<!-- Grid Container -->
<div bind:this={gridDiv} style={gridStyle}></div>
