import styled from 'styled-components'

export const LaunchScreenStyles = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  z-index: 10;
  .ant-spin-dot {
    font-size: 70px !important;
  }
  .ant-spin-dot i {
    width: 30px !important;
    height: 30px !important;
  }
`
