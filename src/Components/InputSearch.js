import React from 'react'

function InputSearch(props) {
  return (
    <>
    <div className="col-12"> 
    <div className="input-group input-group-sm">
   
    <span className='input-group-text'  id='basic-addon1' >
    <i className=" fa-solid fa-magnifying-glass"></i>
          </span>
       
          <input
            type="text"
            className="form-control form-control-sm"
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e)=>props.onChange(e.target.value)}
            />
   {props.value ? <span className='input-group-text'  id='basic-addon1' defaultValue="" onClick={()=>props.onChange("")}>
          <i className=" fa-regular fa-circle-xmark"  ></i>
          </span> : null}
      </div>
    </div>
  

  
  
  </>
  )
}

export default InputSearch