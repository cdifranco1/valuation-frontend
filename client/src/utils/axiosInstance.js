import axios from 'axios'

const prodServer = 'https://valuation-backend.herokuapp.com/'

const devServer = `http://localhost:5000`

export const axiosInstance = () => {
  const tokens = JSON.parse(localStorage.getItem("okta-token-storage"))

  const accessToken = tokens ? (tokens.accessToken ? tokens.accessToken.accessToken : null) : null

  return (
    axios.create({
      baseURL: prodServer,
      headers: {
        authorization: accessToken
      },
      withCredentials: true
    })
  )
}


export const currency = (num) => {
  return `$${num.toFixed(2)}`
}