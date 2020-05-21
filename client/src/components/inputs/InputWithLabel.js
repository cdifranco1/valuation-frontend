import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const RowStyle = 'text-2xl text-blue-900 px-4'


export const InputWithLabel = ({ changeHandler, value, name, id, inputType, labelText, labelWidth, inputWidth}) => {

  return (
      /* <label 
        htmlFor={id} 
        className={`${RowStyle} ${!!labelWidth ? labelWidth : 'w-1/3'}`}
      >
        {labelText}
      </label> */
      <TextField
        label={labelText} 
        type={inputType} 
        onChange={changeHandler} 
        id={id} 
        name={name} 
        value={value} 
      />
  )
}
