import { createStore } from 'vuex'
import * as api from '../api'

export default createStore({
  state: {
    data: [],
    user: {},
    likedOfMe: []
  },
  getters: {
    getTrendings (state) {
      return state.data
    },
    getRepoById: (state) => (id) => {
      return state.data.find(item => item.id === id)
    },
    getUnstarredOnly (state) {
      return state.data.filter((trendingsRepo) => {
        return !state.likedOfMe.some(starredRepo => {
          return trendingsRepo.id === starredRepo.id
        })
      })
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_FOLLOWING: (state, payload) => {
      state.data = state.data.map((repo) => {
        if (payload.id === repo.id) {
          repo.following = {
            ...repo.following,
            ...payload.data
          }
        }
        return repo
      })
    },
    SET_STARRED: (state, starred) => {
      state.likedOfMe = starred
    },
    SET_ISSUES: (state, issues) => {
      state.likedOfMe = state.likedOfMe.map((item) => {
        if (item.id === issues.idOwner) {
          item.issuesList = []
          for (let i = 0; i < issues.length; i++) {
            item.issuesList.push({
              nick: issues[i].user.login,
              comment: issues[i].title
            })
          }
        }
        return item
      })
    },
    SET_TRENDINGS: (state, trendings) => {
      state.data = trendings.map((item) => {
        item.following = {
          status: false,
          loading: false,
          error: ''
        }
        return item
      })
    },
    SET_README: (state, payload) => {
      state.data = state.data.map(repo => {
        if (payload.id === repo.id) {
          repo.readme = payload.content
        }
        return repo
      })
    }
  },
  actions: {
    logout () {
      console.log('logout')
      localStorage.removeItem('token')
      window.location.reload()
    },
    async starRepo ({ commit, getters }, id) {
      const { name: repo, owner } = getters.getRepoById(id)

      commit('SET_FOLLOWING', {
        id,
        data: {
          status: false,
          loading: true,
          error: ''
        }
      })

      try {
        api.starred.starRepo({ owner: owner.login, repo })
        commit('SET_FOLLOWING', {
          id,
          data: {
            status: true
          }
        })
      } catch (error) {
        commit('SET_FOLLOWING', {
          id,
          data: {
            status: false,
            error: 'Error has happened'
          }
        })
      } finally {
        commit('SET_FOLLOWING', {
          id,
          data: {
            loading: false
          }
        })
      }
    },
    async unStarRepo ({ commit, getters }, id) {
      const { name: repo, owner } = getters.getRepoById(id)

      commit('SET_FOLLOWING', {
        id,
        data: {
          status: true,
          loading: true,
          error: ''
        }
      })

      try {
        await api.starred.unStarRepo({ owner: owner.login, repo })
        commit('SET_FOLLOWING', {
          id,
          data: {
            status: false
          }
        })
      } catch (error) {
        commit('SET_FOLLOWING', {
          id,
          data: {
            status: true,
            error: 'Error has happened'
          }
        })
      } finally {
        commit('SET_FOLLOWING', {
          id,
          data: {
            loading: false
          }
        })
      }
    },
    async fetchIssue ({ state, commit, rootState }, { id, owner, repo }) {
      try {
        const { data } = await api.issue.getIssue({ owner, repo })
        data.idOwner = id
        commit('SET_ISSUES', data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchUser ({ state, commit, rootState }) {
      try {
        const { data } = await api.user.getUser()
        commit('SET_USER', data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchLikedOfMe ({ state, commit, rootState }) {
      try {
        const { data } = await api.starred.getStarredRepos(10)
        commit('SET_STARRED', data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchTrendings ({ state, commit, rootState }) {
      try {
        const { data } = await api.trendings.getTrendings()
        commit('SET_TRENDINGS', data.items)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchReadme ({ commit }, { id, owner, repo }) {
      const curRepo = this.getters.getRepoById(id)
      if (curRepo.readme !== undefined) return
      try {
        const { data } = await api.readme.getReadme({ owner, repo })
        commit('SET_README', { id, content: data })
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  modules: {
  }
})
