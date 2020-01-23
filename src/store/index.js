// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_LOADING = 'SET_LOADING';
const SET_FORK = 'SET_FORK';
const SET_USER = 'SET_USER';
const SET_FLAG = 'SET_FLAG';
const SET_FLAG_CLEAR_DATA = 'SET_FLAG_CLEAR_DATA';
const RESET_FORK = 'RESET_FORK';


export default new Vuex.Store({
  state: {
    searchQuery: '',
    loading: false,
    fork: null,
    user: null,
    flag: false,
    flagData: null
  },

  mutations: {
    [SET_SEARCH_QUERY]: (state, searchQuery) => state.searchQuery = searchQuery,
    [SET_LOADING]: (state, loading) => state.loading = loading,
    [SET_FORK]: (state, fork) => state.fork = fork,
    [SET_USER]: (state, user) => state.user = user,
    [SET_FLAG]: (state, flag) => state.flag = flag,
    [SET_FLAG_CLEAR_DATA]: (state, flag) => state.flagData = flag,
    [RESET_FORK]: state => state.fork = null,

  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit(SET_SEARCH_QUERY, searchQuery)
    },
    async search({commit, state}) {
      commit(SET_LOADING, true)
      try {
        const {data} = await axios.get(`https://api.github.com/users/${state.searchQuery}`);
        const repos = await axios.get(`https://api.github.com/users/${state.searchQuery}/repos`);
        commit(RESET_FORK);

        let parseRepo = [...JSON.parse(JSON.stringify(repos.data))];
        commit(SET_FORK, data);
        commit(SET_USER, parseRepo);
      } catch (e) {
        console.log(e);
        commit(RESET_FORK);
      }
      commit(SET_LOADING, false);
    },
    setFlag({commit}, payload) {
      commit(SET_FLAG, payload);
    },
    clearData({commit}, payload) {
      commit(SET_FLAG_CLEAR_DATA, payload);
    }
  }
})

