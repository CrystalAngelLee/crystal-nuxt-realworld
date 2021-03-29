import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles',
    params
  })

// 获取关注的文章列表
export const getFeedArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })

// 赞
export const onFavorite = slug =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })

// 取消赞
export const onCancelFavorite = slug =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })

// 获取文章
export const getArticle = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })

// 获取评论列表
export const getComments = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })

// 发布文章
export const createArticle = data =>
  request({
    method: 'POST',
    url: '/api/articles',
    data
  })

// 更新文章
export const updateArticle = (slug, data) =>
  request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })

// 删除文章
export const deleteArticle = slug =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })

// 喜欢文章
export const favoriteArticle = slug =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })

export const unfavoriteArticle = slug =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })

export const addComment = (slug, data) =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
