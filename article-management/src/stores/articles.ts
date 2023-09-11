import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('Articles', {
  state: () => {
    return {
      tags: [
        { key: '001', value: 'Tag1' },
        { key: '002', value: 'Tag2' },
        { key: '003', value: 'Tag3' }
      ]
    }
  },
  getters: {
    getTags: (state) => {
      return state.tags
    }
  }
})
