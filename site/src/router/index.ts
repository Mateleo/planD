import {createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const title = "PlanD"
router.beforeEach((to, from) => {
  document.title = "PlanD - "+String(to.name) || title
});

// router.beforeEach((to, from) => {
//   if(to.name!="Maintenance") return '/'
// });

export default router;
