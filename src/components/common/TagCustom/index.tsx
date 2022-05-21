import { FC } from 'react'
import { CSSProperties } from 'styled-components'
import TagCustomWrapper from './styles'

interface Props {
  name?: string
  text?: string
  style?: CSSProperties
  className?: string
  IconCPN?: FC
}

const TagCustom: FC<Props> = ({ text, name, IconCPN, ...props }) => {
  return (
    <TagCustomWrapper {...props}>
      {IconCPN && <IconCPN />}
      <div>{name || text || ''}</div>
    </TagCustomWrapper>
  )
}

export default TagCustom
