import React, { useContext } from 'react'
import { DeliveryNull, NotSignIn } from '../../components/useComponent/notfound'
import UserContext from '../../context/userContext'
export default () => {
  const state = useContext(UserContext)
  return (<>
    {state.isLogin ? (<DeliveryNull />) : (<NotSignIn />)}
  </>)
}
