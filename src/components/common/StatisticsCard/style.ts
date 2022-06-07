import styled from 'styled-components'

export const StatisticsCardStyles = styled.div`
  .status-card {
    padding: 30px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: ${({ theme }) => theme.palette.primary} 0.5s ease 0s;

    &__info {
      flex-grow: 1;
      text-align: center;
      z-index: 1;
      text-transform: capitalize;

      & > h4 {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      & > span {
        font-size: 1.2rem;
      }
    }
  }

  .status-card::before {
    content: '';
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-image: linear-gradient(
      to top right,
      ${({ theme }) => theme.palette.primary},
      ${({ theme }) => theme.color.yellow}
    );
    position: absolute;
    left: -50%;
    top: 0;
    transform: scale(0);
    transition: transform 0.8s ease 0s;
  }

  .status-card:hover::before {
    transform: scale(3);
  }

  .status-card:hover {
    color: white;
  }
  @media (max-width: 764px) {
    .status-card {
      padding: 14px;
    }
    .status-card__icon {
      font-size: 20px;
      margin-right: 6px;
      margin-left: -7px;
    }
    .status-card__info h4 {
      font-size: 20px;
    }
    .status-card__info span {
      font-size: 14px;
    }
  }
`
