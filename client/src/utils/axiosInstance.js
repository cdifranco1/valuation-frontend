import axios from 'axios'

export const axiosInstance = () => {
  const tokens = JSON.parse(localStorage.getItem("okta-token-storage"))
  console.log(tokens)

  const accessToken = tokens ? tokens.accessToken.accessToken : null

  return (
    axios.create({
      baseURL: 'http://localhost:5000',
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