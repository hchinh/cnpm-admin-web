import styled from 'styled-components'

const OrderInfoStyles = styled.div`
  .edit-button-icon-wrapper {
    position: absolute;
    right: 12px;
    top: 0;
  }

  .div-info-customer {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .name-info,
  .info-email {
    margin-top: 15px;
    text-align: center;
    .anticon {
      margin-right: 10px;
    }
  }

  .info-email {
    word-break: break-all;
  }

  .name-info {
    font-size: 18px;
    font-weight: 600;
  }

  .status-info > div:not(:last-child) {
    margin-bottom: 20px;
  }

  .amount-info > div:not(:last-child) {
    margin-bottom: 20px;
  }
`

export default OrderInfoStyles
