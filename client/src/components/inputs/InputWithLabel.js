import React from 'react';

const RowStyle = 'text-2xl text-blue-900 px-4'


export const InputWithLabel = ({ changeHandler, value, name, id, inputType, labelText, labelWidth, inputWidth}) => {

  return (
    <div className="flex flex-row p-3">
      <label 
        htmlFor={id} 
        className={`${RowStyle} ${!!labelWidth ? labelWidth : 'w-1/3'}`}
      >
        {labelText}
      </label>
      <input 
        type={inputType} 
        onChange={changeHandler} 
        id={id} 
        name={name} 
        value={value} 
        className={`${RowStyle} ${!!inputWidth ? inputWidth : 'w-2/3'} text-center bg-white rounded-md py-2 border border-gray-400 bg-gray-300 focus:bg-white focus:border focus:outline-none focus:shadow-outline `}
      />
    </div>
  )
}
