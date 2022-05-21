import styled from 'styled-components';

export const StatusWrapper = styled.div`
  .tag-status-disabled {
    cursor: not-allowed !important;
  }
`;

export const StatusItemStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 6px 8px;
  .left-status {
    margin-right: 10px;
    .anticon {
      font-size: 20px;
    }
  }
  .right-status {
    .anticon {
      margin-right: 0 !important;
    }
  }
`;
