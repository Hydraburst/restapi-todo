import React from 'react'
import {BsCheck2} from 'react-icons/bs'


export default function Checkbox({checked}) {
  return (
    <div className='checkbox-border'>
        <BsCheck2 className={`checkbox${checked ? ' checkbox-checked': ' '}`}/>
    </div>
  )
}
