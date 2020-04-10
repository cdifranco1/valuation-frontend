import React, { useState } from 'react';

const dummy = {revenue: [1000, 1200, 1300, 1400, 1500]}

const spanStyle = {
  padding: '2%'
}

const row = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const LineItem = () => {
  const [ lineItem, setLineItem ] = useState('revenue')
  const [ projections, setProjections ] = useState(dummy)

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div style={row}>
      <h3>{capitalize(lineItem)}</h3>
      {projections[lineItem].map(year => 
        <span style={spanStyle}>{year}</span>
        )}
    </div>
  )
}