import { forEach } from 'lodash'
import { parse } from 'query-string'

export const getQueryParamsFromUrl = (searchStr: string) => {
  const parsed = parse(searchStr)

  forEach(parsed, (value, key) => {
    if (typeof value === 'string') {
      try {
        parsed[key] = JSON.parse(value)
      } catch (error) {
        // console.log(error, 'error')
      }
    }
  })

  return parsed
}
