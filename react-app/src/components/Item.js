import React, { useContext } from 'react'
import './Item.css'


const Item = (props) => {
  const {title,amount,id} = props
  const status =amount<0 ? "expense" : "income"  
  const symbol =amount<0 ? "-" : "+"
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  
  
  return (
    <li className={status}>{title}<span>{symbol}{formatNumber(Math.abs(amount))}</span>
    
    </li>)
  
  
  };
export default Item