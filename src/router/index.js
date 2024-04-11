

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import store from '../store'

// routers
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListView
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: ShoppingCartView,
    meta: { requiresAuth: true } // Add meta field to require authentication
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// chinecheck kung logged in na or not
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = store.state.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {

    next('/login');
  } else {
    next(); 
  }
})

export default router
