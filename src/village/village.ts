import { nanoid } from 'nanoid'
import { range, sortByProperty } from '../functions/functions'
import {
  choose,
  D6,
  D66,
  getRandomInt,
  rollD6,
  rollD66,
  WeightedChoice,
  weightedRandom,
} from '../functions/random'
import { Mapping } from '../utils/types'
import { createRandomInn, Inn } from './inn'
import { ValidLanguage } from './language'
import { createRandomVillageName } from './village-name'

export interface Village {
  name: string
  size: VillageSize
  inhabitants: number
  age: number
  builtWhen: Ages
  leader?: {
    oddity: LeaderOddity
    type: LeaderType
  }
  problem: VillageProblem
  fame: VillageFame
  oddity: VillageOddity
  institutions: VillageInstitution[]
  inns: Inn[]
}

export const createRandomVillage = (lang: ValidLanguage): Village => {
  const roll = rollD6()
  const { size, inhabitantMinMax } = d6ToSizeOfVillage[roll]

  const inhabitants = getRandomInt(inhabitantMinMax[0], inhabitantMinMax[1])

  const ageRoll = rollD66()
  const { age, builtWhen } = d66ToAgeOfVillage(ageRoll)

  const institutions = createVillageInstitutions(size)

  const inns = [
    ...institutions
      .filter(i => i.type === 'inn')
      .map(_ => createRandomInn(lang)),
    createRandomInn(lang),
  ]
  const sortedInns: Inn[] = sortByProperty('name', inns, 'desc')

  const institutionsWithoutInns = institutions.filter(i => i.type !== 'inn')
  const sortedInstitutionsWithoutInns: VillageInstitution[] = sortByProperty(
    'type',
    institutionsWithoutInns,
    'desc',
  )

  return {
    name: createRandomVillageName(lang),
    size,
    inhabitants,
    age,
    builtWhen,
    leader: createRandomLeader(),
    problem: choose(villageProblems),
    fame: choose(villageFames),
    oddity: weightedRandom(villageOdditiesWithWeights).value,
    institutions: sortedInstitutionsWithoutInns,
    inns: sortedInns,
  }
}

type VillageSize = 'outpost' | 'hamlet' | 'village'
type VillageInhabitants = [5, 20] | [20, 100] | [100, 400]
type SizeOfVillage = { size: VillageSize; inhabitantMinMax: VillageInhabitants }

const d6ToSizeOfVillage: Mapping<D6, SizeOfVillage> = {
  1: { size: 'outpost', inhabitantMinMax: [5, 20] },
  2: { size: 'outpost', inhabitantMinMax: [5, 20] },
  3: { size: 'hamlet', inhabitantMinMax: [20, 100] },
  4: { size: 'hamlet', inhabitantMinMax: [20, 100] },
  5: { size: 'hamlet', inhabitantMinMax: [20, 100] },
  6: { size: 'village', inhabitantMinMax: [100, 400] },
}

type Ages =
  | 'beforeBloodMist'
  | 'duringAlderWars'
  | 'duringBloodMist'
  | 'afterBloodMist'
type AgeOfVillage = { age: number; builtWhen: Ages }

const d66ToAgeOfVillage = (roll: D66): AgeOfVillage => {
  if (roll <= 16) {
    return {
      builtWhen: 'beforeBloodMist',
      age: getRandomInt(300, 1100),
    }
  }

  if (roll <= 25) {
    return {
      builtWhen: 'duringAlderWars',
      age: getRandomInt(305, 360),
    }
  }

  if (roll <= 56) {
    return {
      builtWhen: 'duringBloodMist',
      age: getRandomInt(5, 280),
    }
  }

  return {
    builtWhen: 'afterBloodMist',
    age: rollD6(),
  }
}

const leaderOddities = [
  'bickering',
  'cruel',
  'weak',
  'greedy',
  'wise',
  'eccentric',
  'confusing',
  'brutal',
  'cunning',
  'stern',
  'secret',
  'drunkard',
] as const
type LeaderOddity = typeof leaderOddities[number]

const leaderTypes = [
  'council',
  'despot',
  'elder',
  'mayor',
  'druid',
  'sorcerer',
  'noOne',
  'commander',
  'trader',
  'rustBrother',
  'artisan',
  'banditChief',
] as const
type LeaderType = typeof leaderTypes[number]

type Leader = {
  oddity: LeaderOddity
  type: LeaderType
}

const createRandomLeader = (): Leader | undefined => {
  const oddity = choose(leaderOddities)
  const type = choose(leaderTypes)

  return {
    oddity,
    type,
  }
}

const villageProblems = [
  'nightwargs',
  'widespreadDrunkenness',
  'powerStruggle',
  'secretCult',
  'schism',
  'undead',
  'disease',
  'sinkhole',
  'bandits',
  'terrorizingMonster',
  'slaveTrade',
  'hauntedByGhoulOrGhost',
]
type VillageProblem = typeof villageProblems[number]

const villageFames = [
  'excellentWine',
  'deliciousBread',
  'craftsmanship',
  'beautifulLocation',
  'aHorribleMassacre',
  'decadence',
  'wellBrewedBeer',
  'hiddenRiches',
  'strangeDisappearances',
  'worshippingDemons',
  'suspicionOfStrangers',
  'hospitality',
] as const
type VillageFame = typeof villageFames[number]

const villageOddities = [
  'eccentricClothing',
  'incomprehensibleAccent',
  'smellsBad',
  'fullOfFlowers',
  'muddy',
  'oddBuildingMaterials',
  'tentVillage',
  'builtOnSteepHill',
  'oldTowerIntheMiddle',
  'grandBuilding',
  'windy',
  'inbreeding',
  'strangeEatingHabits',
  'builtOnMarshland',
  'cutOutOfACliff',
  'oldBurialSite',
  'wanderingCattle',
  'mostlyInhabitedByWomen',
  'alliedWithMonster',
  'preparingWedding',
] as const
type VillageOddity = typeof villageOddities[number]

const villageOdditiesWithWeights: WeightedChoice<VillageOddity>[] = [
  { weight: 3, value: 'eccentricClothing' },
  { weight: 2, value: 'incomprehensibleAccent' },
  { weight: 2, value: 'smellsBad' },
  { weight: 2, value: 'fullOfFlowers' },
  { weight: 2, value: 'muddy' },
  { weight: 2, value: 'oddBuildingMaterials' },
  { weight: 1, value: 'tentVillage' },
  { weight: 2, value: 'builtOnSteepHill' },
  { weight: 1, value: 'oldTowerIntheMiddle' },
  { weight: 1, value: 'grandBuilding' },
  { weight: 2, value: 'windy' },
  { weight: 1, value: 'inbreeding' },
  { weight: 2, value: 'strangeEatingHabits' },
  { weight: 2, value: 'builtOnMarshland' },
  { weight: 1, value: 'cutOutOfACliff' },
  { weight: 2, value: 'oldBurialSite' },
  { weight: 2, value: 'wanderingCattle' },
  { weight: 2, value: 'mostlyInhabitedByWomen' },
  { weight: 2, value: 'alliedWithMonster' },
  { weight: 2, value: 'preparingWedding' },
]

const villageInstitutions = [
  'nothing',
  'inn',
  'mill',
  'smith',
  'forester',
  'tradingPost',
  'temple',
  'militia',
  'tavern',
  'stable',
] as const
type VillageInstitutionType = typeof villageInstitutions[number]

export type VillageInstitution = {
  id: string
  type: VillageInstitutionType
  name?: string
}

const villageInstitutionsWithWeights: WeightedChoice<VillageInstitutionType>[] =
  [
    { weight: 6, value: 'nothing' },
    { weight: 6, value: 'inn' },
    { weight: 5, value: 'mill' },
    { weight: 4, value: 'smith' },
    { weight: 3, value: 'forester' },
    { weight: 3, value: 'tradingPost' },
    { weight: 2, value: 'temple' },
    { weight: 3, value: 'militia' },
    { weight: 2, value: 'tavern' },
    { weight: 2, value: 'stable' },
  ]

const createVillageInstitutions = (
  villageSize: VillageSize,
): VillageInstitution[] => {
  let rolls = 0
  if (villageSize === 'outpost') {
    rolls = 1
  }

  if (villageSize === 'hamlet') {
    rolls = 3
  }

  if (villageSize === 'village') {
    rolls = 5 + rollD6()
  }

  return range(rolls)
    .map(_ => ({
      id: nanoid(),
      type: weightedRandom(villageInstitutionsWithWeights).value,
    }))
    .filter(i => i.type !== 'nothing')
}
