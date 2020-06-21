import axios from 'axios'

export const axiosInstance = () => {
  const tokens = JSON.parse(localStorage.getItem("okta-token-storage"))
  console.log(tokens)

  const accessToken = tokens ? (tokens.accessToken ? tokens.accessToken.accessToken : null) : null

  return (
    axios.create({
      baseURL: 'https://valuation-backend.herokuapp.com/',
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