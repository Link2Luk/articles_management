import Mock from 'mockjs'
import { type MockMethod } from 'vite-plugin-mock'
import { type User } from '@/types/user'

const users: User[] = Mock.mock([
  {
    id: '@id',
    email: 'admin@example.com',
    name: 'Admin',
    password: 'admin',
    token: 'token_admin@example.com'
  }
])
const timeout = Math.random() * 2000
export default [
  {
    url: '/api/login',
    method: 'post',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { email, password } = body
      const user = users.find((item) => {
        return item.email === email && item.password === password
      })
      return user
        ? {
            code: 0,
            message: 'OK',
            user
          }
        : {
            code: 1,
            message: 'Cannot find the email or the password is wrong!'
          }
    }
  },
  {
    url: '/api/register',
    method: 'post',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { email, password } = body
      const idx = users.findIndex((user) => user.email === email)
      if (idx > -1) {
        return {
          code: 1,
          message: 'account is already exist!'
        }
      } else {
        users.push(
          Mock.mock({
            id: '@id',
            email,
            name: '@name',
            password,
            token: `token_${email}`
          })
        )
        return {
          code: 0,
          message: 'OK'
        }
      }
    }
  },
  {
    url: '/api/user',
    method: 'post',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { token } = body
      const user = users.find((user) => user.token === token)
      return user
        ? {
            code: 1,
            user,
            message: 'OK'
          }
        : {
            code: 0,
            message: 'Token is invalid!'
          }
    }
  }
] as MockMethod[]
