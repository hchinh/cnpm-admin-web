import { FC } from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import ButtonWrapper from './styles';

interface Props {
  isCollapse: boolean;
  handleToggle: () => void;
}

const ToggleButton: FC<Props> = ({ isCollapse, handleToggle }) => (
  <ButtonWrapper
    className="extra-button"
    icon={isCollapse ? <RightCircleOutlined /> : <LeftCircleOutlined />}
    onClick={handleToggle}
  />
);

export default ToggleButton;
