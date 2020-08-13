import React, { useState } from "react"
import { connect } from "react-redux"
import numeral from 'numeral';

export const unleverBeta = (beta, taxRate, debtToEquity) => {
  return beta / ((1 - taxRate) * debtToEquity)
}

// will need to be built into the UI to include both units and tax rates
const units = 1000000
const taxRate = 0.25

const formats = {
  currency: (val) => numeral(val / units).format('$0,0'), 
  beta: (beta) => numeral(beta).format('0.00'),
  percentage: (p) => numeral(p).format('0.0%'),
}


const CompList = (props) => {

  return (
    <div className="mt-10">
      <div>
        <span className="py-2">(USD Millions)</span>
      </div>
      <div className="flex justify-between">
        <h3 className="w-1/8 px-2">Ticker</h3>
        <h3 className="w-1/8 px-2">Company</h3>
        <h3 className="w-1/8 px-2">Market Cap</h3>
        <h3 className="w-1/8 px-2">Enterprise Value</h3>
        <h3 className="w-1/8 px-2">Debt-to-Equity Ratio</h3>
        <h3 className="w-1/8 px-2">Levered Beta</h3>
        <h3 className="w-1/8 px-2">Tax Rate</h3>
        <h3 className="w-1/8 px-2">Unlevered Beta</h3>
      </div>
      {props.comps.map((comp, i) => {
        return (
          <div key={comp.ticker + i} className="flex justify-between">
            <span className="w-1/8">{comp.ticker.toUpperCase()}</span>
            <span className="w-1/8">{comp.data.companyName}</span>
            <span className="w-1/8">{formats.currency(comp.data.marketcap)}</span>
            <span className="w-1/8">{formats.currency(comp.data.enterpriseValue)}</span>
            <span className="w-1/8">{numeral(comp.data.debtToEquity).format('0.00')}</span>
            <span className="w-1/8">{formats.beta(comp.data.beta)}</span>
            <span className="w-1/8">{formats.percentage(taxRate)}</span>
            <span className="w-1/8">{formats.beta(unleverBeta(comp.data.beta, taxRate, comp.data.debtToEquity))}</span>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ wacc }) => {
  return {
    comps:  wacc.comps
  }
}



export default connect( mapStateToProps, null )( CompList )
