import axios from 'axios'

export const axiosBase = () => axios.create({
  baseURL: 'http://localhost:5000'
})


export const convertToDec = (num) => {
  return num/100
}

export const convertToPercent = (num) => {
  return num * 100
}