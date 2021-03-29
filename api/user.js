import { request } from '@/plugins/request'

export const login = data =>
  request({
    method: 'POST',
    url: '/api/users/login',
    data
  })

export const register = data =>
  request({
    method: 'POST',
    url: '/api/users',
    data
  })

export const updateUser = data =>
  request({
    method: 'PUT',
    url: '/api/user',
    data
  })

export const followUser = username =>
  request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })

export const unfollowUser = username =>
  request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
