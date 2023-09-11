import Mock from 'mockjs'
import { type MockMethod } from 'vite-plugin-mock'
import { type Article } from '@/types/articles'

const articles: { list: Article[] } = Mock.mock({
  'list|11-30': [
    {
      id: '@id',
      title: '@title(3, 5)',
      content: '@paragraph(1, 3)',
      tags: '@pick(["001", "002", "003"], 0, 3)',
      author: '@name',
      createdTime: '@now("dd-MM-yyyy HH:mm:ss")'
    }
  ]
})

const sort =
  (prop: 'createdTime' | 'title' | 'author', order: 'ascending' | 'descending') =>
  (a: Article, b: Article) => {
    let tmp: string
    let propA = String(a[prop]).toLocaleLowerCase()
    let propB = String(b[prop]).toLocaleLowerCase()

    if (order === 'descending') {
      tmp = propB
      propB = propA
      propA = tmp
    }
    return propA === propB ? 0 : propA < propB ? -1 : +1
  }

const baseUrl = '/api/articles'
const timeout = Math.random() * 2000

export default [
  {
    url: `${baseUrl}/getList`,
    method: 'get',
    statusCode: 200,
    timeout,
    response: ({ query }) => {
      const { page, size, prop, order } = query
      articles.list.sort(sort(prop, order))
      const start = (page - 1) * size
      const end = page * size
      const total = articles.list.length
      const list = page > Math.ceil(total / size) ? [] : articles.list.slice(start, end)
      return {
        code: 0,
        message: 'OK',
        list,
        total,
        page: Number(page),
        size: Number(size)
      }
    }
  },
  {
    url: `${baseUrl}/getItem`,
    method: 'get',
    statusCode: 200,
    timeout,
    response: ({ query }) => {
      const { id } = query
      const item = articles.list.find((itm) => itm.id === id)
      return item
        ? {
            code: 0,
            message: 'OK',
            item
          }
        : {
            code: 1,
            message: 'Error: Article not Found!'
          }
    }
  },
  {
    url: `${baseUrl}/create`,
    method: 'post',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { title, content, tags, author } = body
      articles.list.push(
        Mock.mock({
          id: '@id',
          title,
          content,
          author,
          tags,
          createdTime: '@now("dd-MM-yyyy HH:mm:ss")'
        })
      )
      return {
        code: 0,
        message: 'OK'
      }
    }
  },
  {
    url: `${baseUrl}/update`,
    method: 'post',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { id } = body
      const item = articles.list.find((itm) => itm.id === id)
      if (item) {
        Object.assign(item, body)
        return {
          code: 0,
          message: 'OK'
        }
      } else {
        return {
          code: 1,
          message: 'Fail to update the article!'
        }
      }
    }
  },
  {
    url: `${baseUrl}/delete`,
    method: 'delete',
    statusCode: 200,
    timeout,
    response: ({ body }) => {
      const { id } = body
      const idx = articles.list.findIndex((itm: Article) => itm.id === id)
      if (idx > -1) articles.list.splice(idx, 1)
      return {
        code: 0,
        message: 'OK'
      }
    }
  }
] as MockMethod[]
