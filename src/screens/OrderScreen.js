import React from 'react'
import { useContext } from 'react'
import { OrderNull } from '../components/useComponent/notfound'
import UserContext from '../context/userContext'
export default () => {
  const value = useContext(UserContext)
  console.log(value)
  return <OrderNull />
}
