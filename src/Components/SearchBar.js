import React from 'react'

function SearchBar(props) {
  return (
    <>
    <div className="row w-100 d-flex justify-content-start align-items-center">
    <div className="col-8"> 
    <div className="input-group input-group-sm">
   
          <span className='input-group-text'  id='basic-addon1' >
          <i className=" fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control form-control-sm"
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-sm"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e)=>props.onChange(e.target.value)}
            />
   {props.value ? <span className='input-group-text'  id='basic-addon2' defaultValue="" onClick={()=>props.onChange("")}>
          <i className=" fa-regular fa-circle-xmark"  ></i>
          </span> : null}
       
      </div>
    </div>
    <div className="col-4">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        data-bs-toggle={props.data_bs_toggle}
        data-bs-target={props.data_bs_target}
        onClick={props.onClick}
      >
        Agregar Nuevo
      </button>
    </div>

  </div>
  
  </>
  )
}

export default SearchBar