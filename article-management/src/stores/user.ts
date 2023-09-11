import { defineStore } from 'pinia'
import { type User } from '@/types/user'
export const useUserStore = defineStore('User', {
  state: () => {
    return {
      user: {} as User,
      token: ''
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getToken: (state) => {
      return state.token
    }
  },
  actions: {
    login(user: User) {
      this.user = user
      this.token = user.token || ''
    },
    logout() {
      this.user = {}
      this.token = ''
      sessionStorage.removeItem('token')
    }
  }
})
