import Vue from 'vue'
import VueRouter from 'vue-router'
import Login2 from '../views/auth2/login.vue'
import Register2 from '../views/auth2/register.vue'
import Auth2 from '../views/auth2/index2.vue'
import Chat from '../views/chat/chat.vue'
import Blank from '../views/chat/blank.vue'
import Chatroom from '../views/chat/index.vue'
import Profile from '../views/chat/profile.vue'
import store from '../store/index'
import Front from '../views/Front.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'front',
    component: Front,
    meta: { goLogin: true }
  },
  {
    path: '/auth',
    name: 'Auth2',
    component: Auth2,
    children: [
      {
        path: 'login',
        name: 'Login2',
        component: Login2,
        meta: { requiresVisitor: true }
      },
      {
        path: 'register',
        name: 'Register2',
        component: Register2,
        meta: { requiresVisitor: true }
      }
    ]
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        meta: { requiresAuth: true }
      },
      {
        path: 'blank',
        name: 'Blank',
        component: Blank,
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('pindah halaman')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/chatroom/blank'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.goLogin)) {
    next({
      path: '/auth/login'
    })
  }
})

export default router
