import React, { useState, useEffect } from 'react';
import numeral from 'numeral'
import axios from "axios"

import { APIData } from '../../constants'

const data = {
  CEO: "Timothy Donald Cook",
  address: "One Apple Park Way",
  address2: null,
  city: "Cupertino",
  companyName: "Apple, Inc.",
  country: "US",
  description: "Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 and is headquartered in Cupertino, CA.",
  employees: 137000,
  exchange: "NASDAQ",
  industry: "Telecommunications Equipment",
  issueType: "cs",
  phone: "1.408.996.1010",
  primarySicCode: 3663,
  sector: "Electronic Technology",
  securityName: "Apple Inc.",
  state: "CA",
  symbol: "AAPL",
  tags: (2) ["Electronic Technology", "Telecommunications Equipment"],
  website: "http://www.apple.com",
  zip: "95014-2083"
}

export const WACCBuild = (props) => {
  const [ peer, setPeer ] = useState(data)
  const [ symbol, setSymbol ] = useState("")
  const [ compSet, setCompSet ] = useState([])
  const [ dirty, setDirty ] = useState(false)

  const getComp = () => {
    axios
      .get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${process.env.REACT_APP_IEX_API_KEY}`)
      .then(res => {
        console.log(res)
        setPeer(res.data)
        setDirty(true)
      })
  }

  const handleChange = (e) => {
    setSymbol(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    getComp()
  }

  const addToCompSet = () => {
    setCompSet([...compSet, peer])
  }

  const field = (label, data) => {
    return (
      <div className="flex p-2">
        <span className="font-semibold p-3 w-1/6">{label}</span>
        <span className="p-3 w-5/6">{data}</span>
    </div>
    )
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <label className="text-xl font-bold">
          Search for a Peer Company by Ticker: 
        </label>
        <input 
          type="text"
          value={symbol}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="flex border-gray-800 bg-gray-200 mt-5">
        <div className="flex flex-col">
          {field("Company Name:", peer.companyName)}
          {field("Country:", peer.country)}
          {field("Company Description:", peer.description)}
          {field("Industry:", peer.industry)}
          {field("Sector:", peer.sector)}
          {field("Exchange:", peer.exchange)}
        </div>
      </div>
      {dirty && 
        <button onClick={addToCompSet}>Add to Comp Set</button>
      }
    </div>
  )
}