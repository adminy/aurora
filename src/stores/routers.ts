import { defineStore } from 'pinia'
import router from '@/router'

function routes(): { path: string; name: string }[] {
  return router
    .getRoutes()
    .filter(route => !route.props.hidden)
    .map(route => ({ path: route.path, name: route.name?.toString() || '' }))
}

export const useRoutersStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'routes',
  state: () => ({
    routes: routes()
  }),
  getters: {
    getRouterMap() {
      return routes()
    }
  },
  actions: {}
})
