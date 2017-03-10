import React from 'react'

const Bill = (props) => {
  return(
    <div>
      <h1>{props.bill.title}</h1>
      <p>On {props.bill.latest_major_action_date} : {props.bill.latest_major_action}</p>
      <a href={props.bill.gpo_pdf_uri} target="_blank">Link</a>
    </div>
  )
}

export default Bill
