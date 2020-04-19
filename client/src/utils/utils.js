import axios from 'axios'

export const axiosBase = () => axios.create({
  baseURL: 'http://localhost:5000'
})


export const currency = (num) => {
  return `$${num.toFixed(2)}`
}