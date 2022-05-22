import { createGlobalStyle } from 'styled-components'
import { CLASS_UTILITY } from './utilities'

export const GlobalStyle = createGlobalStyle`
  ${CLASS_UTILITY}
  .box-wrapper {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
  }
`
