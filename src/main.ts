import { createApp } from "vue";
import App from "@/App.vue";
import { createPinia } from "pinia";
import Router from "@/router";

const store = createPinia();
const app = createApp(App);
app.use(store);
app.use(Router);
app.mount("#app");
