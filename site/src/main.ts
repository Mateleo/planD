import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 1,
  newestOnTop: true,
};

app.use(createPinia()).use(router).use(Toast, options);

app.mount("#app");
