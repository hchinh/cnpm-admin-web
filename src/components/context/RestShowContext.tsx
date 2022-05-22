import { createContext } from 'react'

interface IContextProps {
  record?: any
}

export const RestShowContext = createContext({} as IContextProps)
