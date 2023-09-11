export interface Article {
  id?: string
  title?: string
  content?: string
  author?: string
  tags?: string[]
  createdTime?: string
}

export type SortProp = 'createdTime' | 'title' | 'author'
export type SortOrder = 'ascending' | 'descending'