import React, { useState } from "react"
import { connect } from "react-redux"
import numeral from 'numeral';

export const unleverBeta = (beta, taxRate, debtToEquity) => {
  return beta / ((1 - taxRate) * debtToEquity)
}

const taxRate = 0.25

const formats = {
  currency: (val) => numeral(val).format('0,0.0'), 
  beta: (beta) => numeral(beta).format('0.00'),
  percentage: (p) => numeral(p).format('0.00%'),
}


const CompList = (props) => {

  return (
    <div className="p2 mt-10">
      <div className="flex justify-between">
        <h3 className="text-2xl w-1/8">Ticker</h3>
        <h3 className="text-2xl w-1/8">Company</h3>
        <h3 className="text-2xl w-1/8 text-center">Market Capitalization</h3>
        <h3 className="text-2xl w-1/8 text-center">Enterprise Value</h3>
        <h3 className="text-2xl w-1/8 text-center">Debt-to-Equity Ratio</h3>
        <h3 className="text-2xl w-1/8 text-center">Levered Beta</h3>
        <h3 className="text-2xl w-1/8 text-center">Tax Rate</h3>
        <h3 className="text-2xl w-1/8 text-center">Unlevered Beta</h3>
      </div>
      {props.comps.map((comp, i) => {
        return (
          <div key={comp.ticker + i}className="flex justify-between">
            <span className="w-1/8">{comp.ticker.toUpperCase()}</span>
            <span className="w-1/8">{comp.data.companyName}</span>
            <span className="w-1/8 text-center">{formats.currency(comp.data.marketcap)}</span>
            <span className="w-1/8 text-center">{formats.currency(comp.data.enterpriseValue)}</span>
            <span className="w-1/8 text-center">{numeral(comp.data.debtToEquity).format('0.00')}</span>
            <span className="w-1/8 text-center">{formats.beta(comp.data.beta)}</span>
            <span className="w-1/8 text-center">{formats.percentage(taxRate)}</span>
            <span className="w-1/8 text-center">{formats.beta(unleverBeta(comp.data.beta, taxRate, comp.data.debtToEquity))}</span>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ wacc }) => {
  console.log(wacc)
  return {
    comps:  wacc.comps
  }
}



export default connect( mapStateToProps, null )( CompList )
