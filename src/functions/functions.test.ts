import {
  capitalize,
  propertyComparator,
  range,
  sortByProperty,
  tc,
} from './functions'

describe('functions', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello')
    })
  })

  describe('range', () => {
    it('returns an array of numbers from 0 to val', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4])
    })
  })

  describe('propertyComparator', () => {
    it('sorts an array of objects by a key', () => {
      const a = { name: 'a', value: 1 }
      const b = { name: 'b', value: 2 }

      expect(propertyComparator('value', 'asc')(a, b)).toEqual(-1)
    })

    it('sorts an array of objects by a key in descending order', () => {
      const a = { name: 'a', value: 1 }
      const b = { name: 'b', value: 2 }

      expect(propertyComparator('value', 'desc')(a, b)).toEqual(1)
    })
  })

  describe('sortByProperty', () => {
    it('sorts an array of objects by a key in ascending order', () => {
      const arr = [
        { name: 'a', value: 1 },
        { name: 'b', value: 2 },
        { name: 'c', value: 3 },
      ]

      expect(sortByProperty('value', arr, 'asc')).toEqual([
        { name: 'a', value: 1 },
        { name: 'b', value: 2 },
        { name: 'c', value: 3 },
      ])
    })

    it('sorts an array of objects by a key in descending order', () => {
      const arr = [
        { name: 'a', value: 1 },
        { name: 'b', value: 2 },
        { name: 'c', value: 3 },
      ]

      expect(sortByProperty('value', arr, 'desc')).toEqual([
        { name: 'c', value: 3 },
        { name: 'b', value: 2 },
        { name: 'a', value: 1 },
      ])
    })
  })

  describe('tc', () => {
    it('combines a static namespace + object key with a dynamic sub key', () => {
      expect(tc('namespace.object', 'key')).toBe('namespace.object.key')
    })
  })
})
