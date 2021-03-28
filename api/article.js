import { request } from '@/plugins/request';

// 获取公共文章列表
export const getArticles = (params) =>
  request({
    method: 'GET',
    url: '/api/articles',
    params,
  });

// 获取关注的文章列表
export const getFeedArticles = (params) =>
  request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
  });

// 赞
export const onFavorite = (slug) =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  });

// 取消赞
export const onCancelFavorite = (slug) =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  });

// 获取文章
export const getArticle = (slug) =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  });

// 获取评论列表
export const getComments = (slug) =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  });

// 发布文章
export const createArticle = (params) =>
  request({
    method: 'POST',
    url: '/api/articles',
    params,
  });