import { omit } from 'lodash'
import React, { FC, useCallback } from 'react'

interface Props {
  children: React.ReactElement
  disabled: boolean
}

const CheckPermissions: FC<Props> = ({ children, disabled }) => {
  const childrenWithProps = useCallback(
    () => {
      return React.cloneElement(children, {
        ...omit(children.props, 'children'),
        ...{ disabled },
      })
    },
    [children] // eslint-disable-line
  )

  return childrenWithProps()
}

export default CheckPermissions
