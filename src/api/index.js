import axios from 'axios'

export function getMenus () {
  return axios.get('/api/getMenus')
}

export function getPoetry () {
  return axios.get('/api/getPoetry')
}

export function getDynasties () {
  return axios.get('/api/getDynasties')
}
