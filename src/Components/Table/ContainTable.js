import React from 'react'

function ContainTable(props) {
  return (
    <>
    <div className='table-wrap-venta '>
        <table className='table-item'>
        {props.children}
        </table>

    </div>
    </>
  )
}

export default ContainTable