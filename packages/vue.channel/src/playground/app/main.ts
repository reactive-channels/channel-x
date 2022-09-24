import { App, createApp } from 'vue';
import devtool from '../../lib/devtools';
import vueApp from './App.vue';
import router from './router';
const app: App<Element> = createApp(vueApp);
app.use(devtool).use(router).mount('#app');
