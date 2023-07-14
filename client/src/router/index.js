import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddTortue from "../views/AddTortue.vue";
import TortueDetail from "../views/TortueDetail.vue";
import EditTortue from "../views/EditTortue.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import App from "../App.vue";
import Logout from "../views/Logout.vue";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "app",
    component: App,
    meta: {
      requiresAuth: false, // La page d'accueil n'a pas besoin d'authentification
    },
  },

  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true, // La page Home nécessite une authentification
    },
  },
  {
    path: "/add-tortue",
    name: "add-tortue",
    component: AddTortue,
    meta: {
      requiresAuth: true, // La page AddTortue nécessite une authentification
    },
  },
  {
    path: "/tortue-detail/:id",
    name: "tortue-detail",
    component: TortueDetail,
    meta: {
      requiresAuth: true, // La page TortueDetail nécessite une authentification
    },
  },
  {
    path: "/edit-tortue/:id",
    name: "edit-tortue",
    component: EditTortue,
    meta: {
      requiresAuth: true, // La page EditTortue nécessite une authentification
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      requiresAuth: false, // La page Signup n'a pas besoin d'authentification
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false, // La page Login n'a pas besoin d'authentification
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      requiresAuth: false, // La page Login n'a pas besoin d'authentification
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: true, // La page About n'a pas besoin d'authentification
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    // Redirige vers la page de connexion
    next({ name: "login" });
  } else {
    // Continue la navigation normalement
    next();
  }

  if (to.matched.length === 0) {
    // Aucune route correspondante trouvée
    next({ path: "/404" }); // Rediriger vers la page 404
  } else {
    next(); // Continuer vers la route demandée
  }
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token; // Renvoie true si le token existe, sinon false
}

export default router;
