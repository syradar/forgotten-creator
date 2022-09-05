import { choose, getRandomInt } from './random'

describe('random', () => {
  describe('getRandomInt', () => {
    it('returns a random number between min and max', () => {
      expect(getRandomInt(0, 1)).toBeGreaterThanOrEqual(0)
      expect(getRandomInt(0, 1)).toBeLessThanOrEqual(1)
    })

    it('returns a random number between 1 and 6 if no arguments are passed', () => {
      expect(getRandomInt()).toBeGreaterThanOrEqual(1)
      expect(getRandomInt()).toBeLessThanOrEqual(6)
    })
  })

  describe('choose', () => {
    it('returns a random item from an array', () => {
      const xs = [1, 2, 3, 4, 5]

      expect(xs).toContain(choose(xs))
    })
    it('throws an error if the array is empty', () => {
      expect(() => choose([])).toThrow()
    })
  })
})
