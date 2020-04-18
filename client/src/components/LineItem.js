import React from 'react';


const spanStyle = {
  padding: '2%'
}

const row = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const LineItem = ({name, values}) => {
  console.log(values)

  return (
    <div style={row}>
      <h3>{name}</h3>
      {values.map(el => 
        <span style={spanStyle}>{el}</span>
      )}
    </div>
  )
}