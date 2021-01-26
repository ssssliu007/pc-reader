import App from "~/App.svelte";
import "~/utils/scss/main"
import {BrowserWindow} from "electron"

new App({
	target: document.querySelector("#app")
});
