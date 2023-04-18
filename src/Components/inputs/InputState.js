import React from 'react'

function InputState(props) {
  return (
    <>
        <div className="form-outline mb-3 center">
       <label className="form-label" htmlFor="form1Example1">{props.label}</label>
       <div className="form-outline mb-3">
        <div className="form-check form-check-inline">
  <input className="form-check-input" 
  type="radio" name="estado" id="inlineRadio3" 
  value={props.value} checked={props.value === "Activo" ? true : false} 
  onChange={() => props.onChange("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" 
  value={props.value} checked={props.value === "No Activo" ? true : false} 
  onChange={() => props.onChange("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio4">No activo</label>
  </div>
</div>
  </div>
    </>
    
  )
}

export default InputState