import React from 'react'

function InputSelect(props) {
  return (
    <>
        <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >{props.label}</label>
      <div className="col-12">  

                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true"  aria-label="Floating label select example"
                   value={props.value} 
                   onChange={(e)=>props.onChange(e.target.value)}>
                  <option value={0} >-- Seleccionar --</option>
                         {props.data ? props.data.map((item,index) =>(
                         <option 
                         key={index} 
                         value={item.id} 
                         data-tokens={item.name}
                    
                         >
                          {item.name}                        
                          </option>))
                         :
                        null
                          }
                    </select>
                  
              </div> 
  </div>
    </>
  )
}

export default InputSelect