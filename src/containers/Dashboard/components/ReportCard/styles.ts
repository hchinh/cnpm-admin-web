import styled from 'styled-components'

const ReportCardStyles = styled.div`
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .report-card {
    &__header {
      padding: 20px 32px;
    }
    &__body {
      padding: 32px;
    }
    &__footer {
      padding: 10px 20px;

      a {
        font-weight: 500;
        font-size: 16px;
        color: #000000 !important;
        text-transform: capitalize;
        font-family: 'Inter', sans-serif;
      }
    }

    &__header {
      line-height: 20px;
    }

    &__header-title {
      font-weight: bold;
      font-size: 20px;
    }

    &__body {
      flex: 1;
    }

    &__footer {
      font-weight: 500;
      .arrow-icon {
        margin-left: 10px;
      }
      .see-detail-link {
        white-space: nowrap;
      }
    }
    &__header-action {
      display: flex;
      align-items: center;
      .icon-more-action {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }

  .ant-divider {
    margin: 0 !important;
    background: #ecf0f2 !important;
  }
`

export default ReportCardStyles
