import React, { useState, useEffect } from 'react';
import axios from 'axios'
import numeral from 'numeral'

import { APIData } from '../../constants'

export const CompsList = (props) => {
  const [ EV, setEV ] = useState([])

  const getComp = () => {
    // axios
    //   // .get(`https://cloud.iexapis.com/stable/stock/aapl/advanced-stats?token=process.env.API_KEY`)
    //   .then(res => {
    //     console.log(res)
    //     setEV(res.data)
    //     console.log(EV)
    const setData = () => {
      setEV(APIData)
    }

    setTimeout(setData, 1000)
  }

  useEffect(getComp, [])


  return (
    <div>
      {numeral(EV.enterpriseValue).format('(0,000.0)')}
    </div>
  )
}