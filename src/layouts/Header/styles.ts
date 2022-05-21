import styled from 'styled-components'
import { Layout, Menu } from 'antd'

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

  .div-user-info {
    cursor: pointer;
    display: flex;
  }
  .userInfo {
    display: inline-flex;
    flex-direction: column;
    line-height: 20px;
    vertical-align: middle;
    margin-right: 15px;
    margin-left: 10px;
    text-align: right;
    max-width: 250px;
    max-height: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    strong,
    .role {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    @media only screen and (max-width: 1200px) {
      max-width: 150px;
    }
  }

  @media only screen and (max-width: 900px) {
    .rightHeader .btn-header {
      display: none;
    }
  }
`

export default HeaderWrapper

export const MenuStyles = styled(Menu)`
  min-width: 120px;
  div.active {
    background: ${({ theme }) => theme.palette.primary};
    border: 1px solid ${({ theme }) => theme.palette.primary};
  }
  .ant-dropdown-menu-item {
    padding: 0;
    .link-menu-item {
      width: 100%;
      height: 100%;
      margin: 0;
      color: ${({ theme }) => theme.text.primary};
    }
    .icon-menu-item {
      margin-right: 10px;
    }
    .div-menu-item {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      & > div {
        margin-right: 10px;
        text-align: center;
        width: 32px;
      }
    }
    .profile-menu-item,
    .div-menu-item {
      font-size: 14px;
    }
  }
`
