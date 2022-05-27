import { unwrapResult } from '@reduxjs/toolkit'
import { useAppDispatch } from 'app/hooks'
import { FC, useEffect } from 'react'
import { checkRefreshToken } from 'redux/authSlice'
import HeaderWrapper from './styles'
import UserInfo from './UserInfo'

const Header: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        const resultAction = await dispatch(checkRefreshToken({ refreshToken }))
        unwrapResult(resultAction)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderWrapper className='header'>
      <div className='leftHeader'></div>
      <div className='rightHeader'>
        <UserInfo />
      </div>
    </HeaderWrapper>
  )
}

export default Header
