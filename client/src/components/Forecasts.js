import React, { useState, useEffect } from 'react';
import { lineItemTitles } from '../constants/index'

const spanStyle = {
  padding: '2%'
}

const row = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const Forecasts = (props) => {
  return (
    <div style={row}>
      <h3>{lineItemTitles[props.lineItem]}</h3>
      {props.projections.map((el, index) => 
        <span style={spanStyle} key={index}>{el}</span>
        )}
    </div>
  )
}