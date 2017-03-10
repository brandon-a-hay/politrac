import React from 'react'
import './activebills.scss'

const ActiveBills = (props) => {
  return(
    <div>
      <h2>Recent legislation</h2>
      <ul>
        {props.legislation.bills.map(bill => (
          <li className="active-bill">
            <a href={'bill/' + props.legislation.congress + '/' + bill.number} key={bill.number}>{bill.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActiveBills
