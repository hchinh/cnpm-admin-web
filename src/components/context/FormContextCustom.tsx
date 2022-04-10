import { FormInstance } from 'antd/es/form/Form'
import { createContext } from 'react'

interface IContextProps {
  form: FormInstance
  record?: any
  allowPressEnter?: boolean
  handleSubmit?: (value: any) => void
}

export const FormContextCustom = createContext({} as IContextProps)
