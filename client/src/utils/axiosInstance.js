import axios from 'axios'
import { Auth } from "aws-amplify"

const prodServer = 'https://valuation-backend.herokuapp.com/'
const devServer = `http://localhost:5000`


export const axiosInstance = (idToken) => {
  return (
    axios.create({
      baseURL: prodServer,
      headers: {
        authorization: idToken
      },
      withCredentials: true
    })
  )
}


export const currency = (num) => {
  return `$${num.toFixed(2)}`
}

export const axiosIEX = (symbol, queryType) => {
  return axios.create({
    baseURL: `https://cloud.iexapis.com/stable/stock/`,
    url: `${symbol}/${queryType}?token=${process.env.REACT_APP_IEX_API_KEY}`
  })
}
