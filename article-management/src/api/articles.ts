import { type Article, type SortProp, type SortOrder } from '@/types/articles'
import api from '@/utils/api'

export const getArticles = (page: number, size: number, prop: SortProp, order: SortOrder) =>
  api('/api/articles/getlist', { page, size, prop, order }, { method: 'get' })
export const getArticle = (id: string) => api('/api/articles/getItem', { id }, { method: 'get' })
export const createArticle = (data: Article) =>
  api('/api/articles/create', data, { method: 'post' })
export const updateArticle = (data: Article) =>
  api('/api/articles/update', data, { method: 'post' })
export const deleteArticle = (id: string) =>
  api('/api/articles/delete', { id }, { method: 'delete' })
