import { FC } from 'react'

interface Props {
  title: string
  total?: number
}

const HeaderTotal: FC<Props> = ({ title, total = 0 }) => {
  return (
    <div className='flex-center-between p-12'>
      <div className='total-value'>{`${total} ${title}`}</div>
    </div>
  )
}

export default HeaderTotal
