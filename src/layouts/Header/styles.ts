import styled from 'styled-components'
import { Layout } from 'antd'

const HeaderWrapper = styled(Layout.Header)`
  .leftHeader {
    display: flex;
    justify-content: start;
    width: 50%;

    @media only screen and (max-width: 1300px) {
      width: 40%;
    }
  }

  .rightHeader {
    display: flex;
    align-items: center;
    button {
      margin-right: 10px;
    }
  }

  @media only screen and (max-width: 900px) {
    .rightHeader .btn-header {
      display: none;
    }
  }
`

export default HeaderWrapper
