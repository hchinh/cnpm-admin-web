import { Layout } from 'antd'
import Header from 'layouts/Header'
import SideBar from 'layouts/SideBar'
import { FC, ReactNode } from 'react'
import PrivateLayoutWrapper from './styles'

const { Content, Footer } = Layout

interface Props {
  children: ReactNode
}

const PrivateLayout: FC<Props> = ({ children }) => {
  return (
    <PrivateLayoutWrapper>
      <Layout hasSider className='layout-window-view'>
        <SideBar />
        <Layout className='site-layout'>
          <Header />
          <Content className='site-layout-background'>
            <div className='content' id='status'>
              {children}
            </div>
            <Footer className='footer'>Footer</Footer>
          </Content>
        </Layout>
      </Layout>
    </PrivateLayoutWrapper>
  )
}

export default PrivateLayout
