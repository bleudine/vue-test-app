import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import PokemonLightbox from '@/components/PokemonLightbox'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pokemon'
  },
  {
    path: '/pokemon',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':id',
        component: PokemonLightbox
      }
    ]
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
