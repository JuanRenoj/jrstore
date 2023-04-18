import React, {useState } from 'react'


function DropDown( props) {
    const[open,setOpen] =useState(false);



  return (
    <div className='dropdown_input'

    >
   
        <div className='input-group mb-2 '>
                <input type='text' 
                className='form-control form-control-sm'
                placeholder={open ? 'Buscar...' : 'Seleccionar...'}
                value={props.value}
                onChange={props.onChange}
              
                   onClick={()=>setOpen(!open)}
                />


                <span className='input-group-text'>

               { open ? <i className="fa-solid fa-chevron-up "  onClick={()=>setOpen(!open)} ></i> : <i className="fa-solid fa-chevron-down"  onClick={()=>setOpen(!open)}></i>
                }
                </span>
               
        
               
              
   {props.value ? <span className='input-group-text'  id='basic-addon1' defaultValue="" onClick={()=>{props.setValue(""); props.setSelected("")}}>
   <i className=" fa-regular fa-circle-xmark"  ></i>
   </span> : null}
             
        </div>
        
        <div className={open ? 'open_input' : 'options_input'}>
            {props.data ? props.data.map((item,index)=>(
                    <div key={index} className={item.id === props.selected ? 'option_input selected': 'option_input'} onClick={()=>{
                        props.setValue(item.name) 
                        props.setSelected(item.id)}}>{item.name}
                    </div>
                ))
                :
                null
            }
        </div>
      {/**  {props.item !=="" ?
         <div className='item-selected'>
        <label>{props.item}</label>
        <span className=" fa-regular fa-circle-xmark icon-c"  
          onClick={()=>{
          props.setValue("") 
          props.setSelected("")
          }}></span>
        </div>
        :null}
       */} 
      
    </div>
  )
}

export default DropDown