import styled from 'styled-components'

const ListLayoutStyles = styled.div`
  .list-layout {
    &__pagination-bottom {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .ant-table-thead > tr:first-child > th {
    font-weight: 600;
    text-transform: uppercase;
  }
`

export default ListLayoutStyles
