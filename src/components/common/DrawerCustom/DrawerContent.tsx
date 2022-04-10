import { DrawerContentProps } from 'interfaces/modal';
import { FC } from 'react';
import Header from './Header';
import Footer from './Footer';

const DrawerContent: FC<DrawerContentProps> = ({
  title,
  onClose,
  onOk,
  okButtonProps,
  cancelButtonProps,
  okText,
  children,
  footer,
}) => {
  return (
    <div className="drawer-content-wrapper">
      {title ? <Header onClose={onClose} title={title} /> : null}

      <div className="drawer-content">{children}</div>
      {footer || (
        <Footer
          onClose={onClose}
          onOk={onOk}
          okButtonProps={okButtonProps}
          cancelButtonProps={cancelButtonProps}
          okText={okText}
        />
      )}
    </div>
  );
};

export default DrawerContent;
