import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import employeeApi from 'api/employeeApi'
import { GENDER_CONST } from 'configs/localData'
import { Employee, ModalForwardRefHandle } from 'interfaces'
import { useEffect, useRef, useState } from 'react'
import { formatGender, formatRole } from 'utils/textUtils'
import ChangePasswordModal from './components/ChangePasswordModal'
import { ProfileStyles } from './styles'

const Profile = () => {
  const [profile, setProfile] = useState<Employee>()

  const changePasswordModalRef = useRef<ModalForwardRefHandle>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const id = Number(localStorage.getItem('id'))
        const data: Employee = await employeeApi.getById(id)
        setProfile(data)
      } catch (error) {
        console.log('Failed to fetch profile: ', error)
      }
    })()
  }, [])

  const handleShowModal = () => {
    changePasswordModalRef.current && changePasswordModalRef.current.open()
  }

  return (
    <ProfileStyles className='box-wrapper d-flex'>
      <div className='left-column flex-center'>
        <div className='avatar-wrapper'>
          <Avatar
            src={
              profile?.profilePicture
                ? `data:image/jpeg;base64,${profile?.profilePicture}`
                : 'default-avatar.jpeg'
            }
            icon={<UserOutlined />}
          />
        </div>
      </div>
      <div className='right-column'>
        <div className='flex-column'>
          <div className='name-text'>{profile?.name}</div>
          <div className='username-text'>{profile?.userName}</div>
        </div>
        <div>
          <Row gutter={[20, 20]} className='d-flex mb-16'>
            <Col xl={6}>
              <b className='fs-16'>Email</b>
            </Col>
            <Col xl={18} className='fs-16'>
              {profile?.email}
            </Col>
          </Row>

          <Row gutter={[20, 20]} className='d-flex mb-16'>
            <Col xl={6}>
              <b className='fs-16'>Phone Number</b>
            </Col>
            <Col xl={18} className='fs-16'>
              {profile?.phoneNumber}
            </Col>
          </Row>

          <Row gutter={[20, 20]} className='d-flex mb-16'>
            <Col xl={6}>
              <b className='fs-16'>Gender</b>
            </Col>
            <Col xl={18} className='fs-16'>
              {profile?.gender !== undefined &&
              GENDER_CONST.map((gender) => gender.value).includes(profile?.gender)
                ? formatGender(profile?.gender)
                : 'N/A'}
            </Col>
          </Row>

          <Row gutter={[20, 20]} className='d-flex mb-16'>
            <Col xl={6}>
              <b className='fs-16'>Address</b>
            </Col>
            <Col xl={18} className='fs-16'>
              {profile?.address}
            </Col>
          </Row>

          <Row gutter={[20, 20]} className='d-flex'>
            <Col xl={6}>
              <b className='fs-16'>Role</b>
            </Col>
            <Col xl={18} className='fs-16'>
              {formatRole(profile ? profile?.roleCode : '')}
            </Col>
          </Row>
        </div>
      </div>
      <div className='change-password-btn'>
        <Button type='primary' onClick={handleShowModal}>
          Change Password
        </Button>
      </div>
      <ChangePasswordModal ref={changePasswordModalRef} />
    </ProfileStyles>
  )
}

export default Profile
