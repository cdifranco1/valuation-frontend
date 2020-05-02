import axios from 'axios'

export const axiosInstance = () => axios.create({
  baseURL: 'http://localhost:5000',
})


export const currency = (num) => {
  return `$${num.toFixed(2)}`
}