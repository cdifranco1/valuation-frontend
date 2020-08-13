import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { updateDisplay } from "../../actions/updateComps"
import CompSelector from './CompSelector';
import CompList from "./WACC"

const buttonClass = "p-3 ml-4 text-blue-600 text-xl font-semibold border-2 border-blue-600 bg-gray-200 shadow-md rounded-lg hover:border-blue-800 hover:font-bold hover:text-blue-800 focus:outline-none focus:shadow-outline"

const WACCBuild = (props) => {

  return (
    <div className="flex flex-col p-10 w-3/4">
      <h1 className="text-lg p-3 text-red-600">WACC Build Functionality In Progress. Currently allows to search and select comps.</h1>
      <div className="flex">
        <button className={buttonClass}  onClick={() => props.updateDisplay("compSelector")}>Peer Selector</button>
        <button className={buttonClass} onClick={() => props.updateDisplay("WACC")}>WACC</button>
      </div>
      <div>
        {props.display.compSelector &&
          <CompSelector />}
        {props.display.WACC &&
          <CompList />} 
      </div>
      <a href="https://iexcloud.io" className="relative bottom-0 left-0 mt-20 text-blue-400">Data provided by IEX Cloud</a>
    </div>
  )
}

const mapStateToProps = ({ wacc }) => { 
  return {
    display: wacc.display
  }
}

const mapDispatchToProps = {
  updateDisplay
}

export default connect(mapStateToProps, mapDispatchToProps)( WACCBuild )






