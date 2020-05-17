import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inventory : [{
      owner : {name:"Ritik"},
      camera :{text:'Camera',data:[{manufacturer:'Canon',desc : '700D'},{manufacturer:'Nikon',desc : 'd5600'}]},
      lenses :{text:'Lenses',data:[{manufacturer:'Canon',desc:'50mm prime'},{manufacturer:'Canon',desc:'18-55mm with lenscap'}]}, 
      battery :{text:'Battery',data:[]},
      sdcard :{text:'SD Card',data:[{manufacturer:'Kingston',desc:'16Gb Class 10 '}]},
      bag :{text:'Bag',data:[{manufacturer:'Canon',desc:'black'}]},
      monopod :{text:'Monopod',data:[]},
      tripod :{text:'Tripod',data:[]},
      },
      {
        owner : {name:"Taneja"},
        camera :{text:'Camera',data:[{manufacturer:'Canon',desc : '700D'},{manufacturer:'Nikon',desc : 'd5600'}]},
        lenses :{text:'Lenses',data:[{manufacturer:'Canon',desc:'50mm prime'},{manufacturer:'Canon',desc:'18-55mm with lenscap'}]}, 
        battery :{text:'Battery',data:[]},
        sdcard :{text:'SD Card',data:[{manufacturer:'Kingston',desc:'16Gb Class 10 '}]},
        bag :{text:'Bag',data:[{manufacturer:'Canon',desc:'black'}]},
        monopod :{text:'Monopod',data:[]},
        tripod :{text:'Tripod',data:[]},
    }

  ]
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