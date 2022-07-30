export const range = (val: number): readonly number[] => [...Array(val).keys()]

export const capitalize = (s: string): string =>
  `${s.charAt(0).toUpperCase()}${s.slice(1)}`

export const propertyComparator = <T>(
  key: keyof T,
  order: 'asc' | 'desc',
): ((a: T, b: T) => number) => {
  return (a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (order === 'asc') {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }

    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
  }
}

export const sortByProperty = <T>(
  key: keyof T,
  arr: T[],
  order: 'asc' | 'desc' = 'desc',
): T[] => [...arr].sort(propertyComparator(key, order))

/**
 * Combine a static namespace + object key with a dynamic sub key.
 */
export const tc = (nsAndObject: string, key: string) => `${nsAndObject}.${key}`
