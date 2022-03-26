import Spin from 'antd/es/spin'
import 'antd/es/spin/style/css'
import { LaunchScreenStyles } from './styles'

function LaunchScreen() {
  return (
    <LaunchScreenStyles>
      <Spin size='large' />
    </LaunchScreenStyles>
  )
}
export default LaunchScreen
