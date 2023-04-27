import { App, createApp } from "vue";
import vueApp from "./App.vue";
// import router from './router';
const app: App<Element> = createApp(vueApp);
app.mount("#app");
