import { Cascader } from 'element-react/next';
import React from 'react'

interface Props {
    key?: any,
    value: any,
    options: any,
    keyOptions?: any,
    size?: any,
    placeholder?: string,
    onChange: Function,
    changeOnSelect: boolean,
    filterable: any,
    disabled?: boolean,
    clearable?: boolean
}

const CCascader = (props: Props) => {   
    return (
        <Cascader
          disabled={props.disabled == true ? true : false}
          filterable={props.filterable}
          props={props.keyOptions ? props.keyOptions : null}
          placeholder={props.placeholder}
          options={props.options}
          style={{width:"100%"}}
          size={props.size ? props.size : 'small'}
          changeOnSelect = {props.changeOnSelect}
          value={props.value}
          clearable={(props.clearable == null || props.clearable == true) ? true: false}
          onChange={(e) => {props.onChange(e)}} />
    )
}

export default CCascader;