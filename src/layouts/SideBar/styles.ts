import styled from 'styled-components'

const SideBarStyles = styled.div`
  .sidebar {
    display: inline-block;
    height: 100vh;
    left: 0;
    background: ${({ theme }) => theme.background.content};
    overflow-y: auto;
    overflow-x: hidden;

    &:hover {
      ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.scrollbar.thumb} !important;
      }
    }

    .ant-menu-inline .ant-menu-item {
      cursor: pointer;
      padding: 15px 25px !important;
      width: 100%;
    }

    .ant-menu-item {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #425466;
      font-weight: 600;

      &:hover {
        color: ${({ theme }) => theme.palette.primary};
      }

      &.active {
        border-radius: 12px;
        background-image: linear-gradient(
          to right,
          ${({ theme }) => theme.palette.primary},
          ${({ theme }) => theme.color.yellow}
        );
        color: ${({ theme }) => theme.text.primaryButtonTextColor};
      }

      .menu-label {
        flex: 1;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 12px;
      }
    }

    .logo {
      padding-left: 0px;
      justify-content: center;
      object-fit: contain;

      & > img {
        cursor: pointer;
        width: 64px;
        height: 64px;
      }
    }
  }
`

export default SideBarStyles
