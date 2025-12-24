import App from "./App.svelte";
import { mount } from 'svelte';

import "./styles.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const app = mount(App, { target: document.getElementById("app") });

export default app;
