import React from 'react'

function HeaderTable(props) {
  return (
    <>
    <thead>
        <tr>
            {props.children}
        </tr>
    </thead>
    </>
  )
}

export default HeaderTable