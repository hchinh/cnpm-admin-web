import styled from 'styled-components'

export const ProfileStyles = styled.div`
  .left-column {
    width: 30%;

    .avatar-wrapper {
      width: 85%;
      & > span {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right-column {
    width: 55%;
    margin-top: 32px;
    margin-left: 20px;
  }

  .name-text {
    font-size: 28px;
    font-weight: 700;
  }

  .username-text {
    margin-bottom: 32px;
  }

  .change-password-btn {
    margin-top: 38px;
  }
`
