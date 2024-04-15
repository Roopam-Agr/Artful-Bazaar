import React from "react"
import MyContext from "./MyContext"

function MyState(props) {
  const state = {
    name: "Roopam Agrawal",
    rollno: 20,
  }

  const color = "red"
  return (
    <MyContext.Provider value={{ state, color }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState
