import api from '@/utils/api'
import { type User } from '@/types/user'
export const login = (data: User) => api('/api/login', data, { method: 'post' })
export const getUserInfo = (token: string) => api('/api/user', {token}, { method: 'post' })
export const register = (data: User) => api('/api/register', data, { method: 'post' })
