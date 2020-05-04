import axios from 'axios'

export const axiosInstance = () => axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
})


export const currency = (num) => {
  return `$${num.toFixed(2)}`
}