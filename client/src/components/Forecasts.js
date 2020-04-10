import React, { useState } from 'react';
import { lineItemTitles } from '../constants/index'

const spanStyle = {
  padding: '2%'
}

const row = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const Forecasts = (props) => {
  const [ projections, setProjections ] = useState(props.projections)

  return (
    <div style={row}>
      <h3>{lineItemTitles[props.lineItem]}</h3>
      {projections.map((el, index) => 
        <span style={spanStyle} key={index}>{el}</span>
        )}
    </div>
  )
}