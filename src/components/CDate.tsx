import { DatePicker } from 'element-react';
import React from 'react'
import { connect } from "react-redux";
interface Props {
    key?: any,
    value: any,   
    onChange: Function,   
    placeholder?: any,
    disabled?: boolean,
}

const CDate = (props: Props) => {          
    return (
        <DatePicker
          isDisabled={props.disabled}
          value={props.value? new Date(props.value):null}
          placeholder={props.placeholder} 
          onChange={(e) => { props.onChange(e); }}
          format={"dd/MM/yyyy"}
          />
    )
}

export default CDate;