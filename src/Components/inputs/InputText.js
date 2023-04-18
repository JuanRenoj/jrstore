import React from 'react'

function InputText(props) {
  return (
    <>
     <div className="form-outline  mb-2">
        <label className="form-label" htmlFor="form1Example1" >
            {props.label}
        </label>   
        <input 
            type={props.type} id="form1Example1" className="form-control form-control-sm"
            value={props.value}  
            onChange={props.max ? (e) => props.onChange(e.target.value.slice(0,props.max)) : (e) => props.onChange(e.target.value)} 
            required ={props.required ? true : false}
            
        />         
  </div>
    </>
  )
}

export default InputText