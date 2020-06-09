import React, { useState, useEffect } from 'react';
import numeral from 'numeral'
import axios from "axios"

import { APIData } from '../../constants'

export const CompsList = (props) => {
  const [ EV, setEV ] = useState([])

  const getComp = () => {
    axios
      .get(`https://cloud.iexapis.com/stable/stock/aapl/advanced-stats?token=${process.env.REACT_APP_IEX_API_KEY}`)
      .then(res => {
        console.log(res)
        setEV(res.data)
      })
  }

  useEffect(getComp, [])


  return (
    <div>
      {numeral(EV.enterpriseValue).format('(0,000.0)')}
    </div>
  )
}