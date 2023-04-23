import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://192.168.255.50:3333',
})
