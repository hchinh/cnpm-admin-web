import { forEach } from 'lodash'
import { parse } from 'query-string'

export const getQueryParamsFromUrl = (searchStr: string) => {
  const parsed = parse(searchStr)

  forEach(parsed, (value, key) => {
    if (typeof value === 'string') {
      try {
        parsed[key] = JSON.parse(value)
      } catch (error) {
        console.log(error, 'error')
      }
    }
  })

  return parsed
}

export const onSearch = (data?: string | undefined, inputValue?: string | undefined): boolean =>
  !!inputValue && data?.toLowerCase()?.search(inputValue?.toLowerCase()) !== -1

export const formatterInputNumber = <Type>(value: Type): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const parserInputNumber = (value: string | undefined): string => {
  return value ? value.replace(/\$\s?|(,*)/g, '') : ''
}

export const getBase64StringFromDataURL = (dataURL: string | null) => {
  if (dataURL) {
    return dataURL.replace('data:', '').replace(/^.+,/, '')
  }

  return null
}
