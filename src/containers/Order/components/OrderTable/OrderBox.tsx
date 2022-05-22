import { FC, ReactNode } from 'react';

interface Props {
  title?: ReactNode | string;
}

const OrderBox: FC<Props> = ({ title, children }) => {
  return (
    <div className="box-wrapper">
      <div className="mb-20 fs-18 fw-bold">{title}</div>
      {children}
    </div>
  );
};

export default OrderBox;
