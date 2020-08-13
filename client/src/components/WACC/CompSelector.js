import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios"
import CachedSearch from "../../memo/CachedSearch"
import { connect } from "react-redux"
import { fetchBetaData, removeComp } from "../../actions/updateComps"



const CompSelector = (props) => {
  const [ peer, setPeer ] = useState({})
  const [ symbol, setSymbol ] = useState("")

  const getComp = (symbol) => {
    return (
      axios
        .get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${process.env.REACT_APP_IEX_API_KEY}`)
    )
  }

  const cachedSearch = useMemo(() => new CachedSearch(getComp, setPeer), [])  

  const handleChange = (e) => {
    setSymbol(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    cachedSearch.changeQuery(symbol)
  }

  const addToCompSet = () => {
    props.fetchBetaData(symbol.toLowerCase())
  }
  
  const removeComp = () => {
    props.removeComp(symbol)
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
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <label htmlFor="query" className="text-xl font-bold mr-3">
          Search for a Peer Company by Ticker: 
        </label>
        <input
          id="query"
          name="query"
          className="p-2 focus:outline-none focus:shadow-outline" 
          type="text"
          value={symbol}
          onChange={handleChange}
          placeholder="e.g., TSLA"
        />
        <button type="submit" className="shadow-md ml-4 py-2 px-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline" >
          Submit
        </button>
      </form>
      <div className="flex border-gray-800 bg-gray-200 mt-5 relative">
        <div className="flex flex-col">
          {field("Company Name:", peer.companyName)}
          {field("Country:", peer.country)}
          {field("Company Description:", peer.description)}
          {field("Industry:", peer.industry)}
          {field("Sector:", peer.sector)}
          {field("Exchange:", peer.exchange)}
        </div>
        {peer.description && 
          <button onClick={addToCompSet} className="shadow-md py-2 px-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline absolute right-0 bottom-0 mr-4 mb-4" >
            Add to Comp Set
          </button>
        }
      </div>
    </div>
  )
}



export default connect(null, { fetchBetaData, removeComp }) (CompSelector)