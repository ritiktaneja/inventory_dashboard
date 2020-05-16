import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inventory : []
  },
  mutations: {
    addToInventory(state,item)
    {
      this.state.inventory.push(item);
    }
  },
  actions: {
  },
  modules: {
  }
})
;