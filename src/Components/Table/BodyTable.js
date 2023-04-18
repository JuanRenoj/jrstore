import React from 'react'

function BodyTable(props) {
  return (
    <>
    <tbody>
   
        {props.children}
     
      </tbody> 
    </>
  )
}

export default BodyTable