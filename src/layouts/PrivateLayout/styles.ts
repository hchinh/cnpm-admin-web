import styled from 'styled-components'
import { SIDEBAR_WIDTH } from 'theme/constants'

const PrivateLayoutWrapper = styled.div`
  .layout-window-view {
    display: flex;
    height: 100vh;
  }

  .site-layout {
    height: 100vh;
    width: calc(100vw - ${() => `${SIDEBAR_WIDTH}px`});
    overflow: hidden;
    transition: all 0.3s ease 0s;
    background: ${({ theme }) => theme.background.container};
  }

  .site-layout-background {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 22px);
    overflow-y: auto;
    overflow-x: hidden;
    background: ${({ theme }) => theme.background.backgroundPage};
  }
  .content {
    padding: 34px 20px;
    flex: 1;
  }

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: bold;
    img {
      height: 40px;
      width: auto;
      margin: auto;
      object-fit: contain;
    }
    .fullLogo {
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .header {
    z-index: 1;
    background: ${({ theme }) => theme.background.content};
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    transition: all 0.5s ease 0.2s;
    @media only screen and (max-width: 430px) {
      display: inherit;
    }
    .leftHeader {
      display: flex;
      align-items: center;
      @media only screen and (max-width: 430px) {
        width: 100%;
        display: inherit;
        padding-right: 45px;
      }
    }
    .rightHeader {
      @media only screen and (max-width: 430px) {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 430px) {
    .ant-layout-sider-collapsed {
      display: none;
    }

    .sidebar {
      position: fixed;
      z-index: 9999;
      height: 100vh;
    }
  }
  .footer {
    background: ${({ theme }) => theme.background.content};
    color: ${({ theme }) => theme.text.primary};
    text-align: center;
    height: 64px;
    @media only screen and (max-width: 630px) {
      display: none;
    }
  }

  .ant-table-tbody {
    background: ${({ theme }) => theme.background.content};
  }
`

export default PrivateLayoutWrapper
