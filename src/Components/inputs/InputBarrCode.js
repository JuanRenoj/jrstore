import React from 'react'

function InputBarrCode(props) {
  return (
    <>
        <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form1Example1"  >
                {props.label}
            </label>   
            <div className="input-group input-group-sm ">
                <span className='input-group-text'  id='basic-addon1' > <i className=" fa-solid fa-barcode"></i></span>
                <input  
                id='barrCode' className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"   
                type={props.type}               
                value={props.value} 
                onChange={(e)=>props.onChange(e.target.value)}              
                onKeyDown={props.onKeyDown ?   (e)=>props.onKeyDown(e) : null}
                required ={props.required ? true : false}
                 />
            </div>
            {props.msgError !== null ? 
            <label className="form-label text-danger" htmlFor="form1Example1"  >
                {props.msgError}
            </label>  : null}
            
        </div>
    </>
  )
}

export default InputBarrCode
