import { type MockMethod } from 'vite-plugin-mock'

import articles from './articles'
// import login from './login'

const mocks: MockMethod[] = [...articles]

export default mocks
