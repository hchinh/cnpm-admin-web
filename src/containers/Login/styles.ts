import styled from 'styled-components'

export const LoginPageStyles = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  .banner {
    width: 50%;
    display: flex;
    align-items: center;

    & > img {
      width: 100%;
      height: 100vh;
      object-fit: content;
      object-position: center;
    }
  }

  .content {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 250px;

    &-header {
      font-size: 16px;
      letter-spacing: 0.15px;
      color: ${({ theme }) => theme.text.tabTitle};
    }

    &-title {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 0.25px;
      margin-bottom: 20px;
      color: ${({ theme }) => theme.text.headerTable};
    }

    .site-form-item-icon {
      margin-right: 4px;
    }

    .login-form-forgot {
      font-size: 16px;
      letter-spacing: 0.15px;
    }

    .ant-form-item-label {
      padding: 0 0 3px;

      & > label {
        font-size: 16px;
        color: ${({ theme }) => theme.text.formLabel};
      }
    }

    .ant-input-affix-wrapper {
      border-radius: 5px;
    }

    .ant-btn-primary {
      border-radius: 5px;

      & > span {
        font-size: 16px;
        letter-spacing: 0.15px;
      }
    }
  }
`
