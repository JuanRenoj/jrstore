import React from 'react'
import { ConvertirAMoneda } from '../../utils/Funciones'

function InputMoney(props) {
  return (
      <>
        <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form1Example1"  >
                {props.label}
            </label>   
            <div className="input-group input-group-sm ">
                <span className='input-group-text'  id='basic-addon1' >Q</span>
                <input  
                id='barrCode' className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"   
                type={props.type}               
                value={props.value } 
                onChange={(e)=>props.onChange(e.target.value)}              
                required ={props.required ? true : false}
                 />
                  <span className='input-group-text'  id='basic-addon1' > {ConvertirAMoneda(props.value ? props.value : 0) }</span>
            </div>
        
            
        </div>
    </>
   
  )
}

export default InputMoney