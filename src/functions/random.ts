// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
export function getRandomInt(min = 1, max = 6) {
  min = Math.ceil(min)
  max = Math.floor(max)

  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const rollD2 = (): D2 => getRandomInt(1, 2) as D2

export const rollD3 = (): D3 => getRandomInt(1, 3) as D3

export const rollD4 = (): D4 => getRandomInt(1, 4) as D4

export const rollD6 = (): D6 => getRandomInt(1, 6) as D6

export const rollD8 = (): D8 => getRandomInt(1, 8) as D8

export const rollD66 = (): D66 => {
  const tens = rollD6() * 10
  const ones = rollD6()

  return (tens + ones) as D66
}

const diceSides = [6, 8, 10, 12] as const
export type DiceSides = typeof diceSides[number]

export type D2 = 1 | 2

export type D3 = 1 | 2 | 3

export type D4 = 1 | 2 | 3 | 4

export type D6 = 1 | 2 | 3 | 4 | 5 | 6

export type D8 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const d66 = [
  11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36, 41,
  42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66,
] as const
export type D66 = typeof d66[number]
export const isD66 = (val: number): val is D66 => d66.includes(val as D66)

export const choose = <T>(xs: readonly T[]): T => {
  const chosen = xs[getRandomInt(0, xs.length - 1)]

  if (!chosen) {
    throw new Error('🔥 choose: returned undefined')
  }

  return chosen
}

export interface WeightedChoice<T> {
  weight: number
  value: T
}

export const weightedRandomConsume = <T>(
  items: WeightedChoice<T>[],
): { chosen: WeightedChoice<T>; rest: WeightedChoice<T>[] } => {
  const totalWeight = items.reduce((acc, item) => acc + item.weight, 0)
  let randomWeight = getRandomInt(0, totalWeight)

  let result = {} as { chosen: WeightedChoice<T>; rest: WeightedChoice<T>[] }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (!item) {
      continue
    }

    randomWeight = randomWeight - item.weight

    if (randomWeight <= 0) {
      result = {
        chosen: item,
        rest: items.filter((_, index) => index !== i),
      }
      break
    }
  }

  return result
}

export const weightedRandom = <T>(
  items: WeightedChoice<T>[],
): WeightedChoice<T> => weightedRandomConsume(items).chosen
