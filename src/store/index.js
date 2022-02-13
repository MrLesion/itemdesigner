import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    productData:{},
    config:{},
    orderLines:[],
    canvas:null
  },
  getters:{
    productData(state){
      return state.productData;
    },
    config(state){
      return state.config;
    },
    orderLines(state){
      return state.orderLines;
    },
    canvas(state){
      return state.canvas;
    }
  },
  mutations: {
    productData(state, payload){
      state.productData = payload;
    },
    config(state, payload){
      state.config = payload;
    },
    addOrderLine(state, payload){
      state.orderLines.push(payload);
    },
    updateCanvas(state, payload){
      state.canvas = payload;
    }
  },
  actions: {
  }
})
