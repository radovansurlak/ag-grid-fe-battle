import { createApp, vaporInteropPlugin } from "vue";
import App from "./App.vue";
import "./styles.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);


createApp(App).use(vaporInteropPlugin).mount("#app");
