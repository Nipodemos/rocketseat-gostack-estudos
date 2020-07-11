import React from 'react'


const CustomAddButton = (props) => {
  console.log('props :>> ', props);
  return (
    <button type="button" onClick={props.clickMethod}>
      Adicionar projeto
    </button>
  )
}

export default CustomAddButton