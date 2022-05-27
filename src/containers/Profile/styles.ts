import styled from 'styled-components'

export const ProfileStyles = styled.div`
  .left-column {
    width: 32%;

    & > div > span {
      width: 360px;
      height: 360px;
    }
  }

  .right-column {
    width: 55%;
    margin-top: 32px;
    margin-left: 15px;
  }

  .name-text {
    font-size: 28px;
    font-weight: 700;
  }

  .username-text {
    margin-bottom: 32px;
  }
`
