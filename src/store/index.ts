import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state() {
    return {}
  },
  getters: {},
  actions: {},
})
// 持久化存储
const mainStore = useMainStore()
// 存值
mainStore.$subscribe((_, state) => {
  sessionStorage.setItem('main-store', JSON.stringify({ ...state }))
})
// 取值
const value = sessionStorage.getItem('main-store')
if (value) {
  mainStore.$state = JSON.parse(value)
}

export { useMainStore }

export default useMainStore
