import { createContext } from 'react'
export const UserStore = props => {
  return (
    <UserContext.Provider value={321}>{props.children}</UserContext.Provider>
  )
}
const UserContext = createContext()
export default UserContext
