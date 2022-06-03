import React from 'react'
import { Spinner } from "react-bootstrap"
import "./Loading.css"

const Loading = ({size = 100}) => {
  return (
    <div className="spinner">
        <Spinner style={{width:size,height:size}} animation="border" />
    </div>
  )
}

export default Loading