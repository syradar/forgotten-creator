import { nanoid } from 'nanoid'
import { choose, WeightedChoice, weightedRandom } from '../functions/random'
import { ValidLanguage } from '../village/language'
import { createRandomVillageName } from '../village/village-name'

export type Gender = 'male' | 'female'

export type Kin = 'human'

export type HumanKin = 'alderlander' | 'aslene' | 'ailander'

export interface Name {
  id: string
  firstName: string
  familyName?: string
  homeName?: string
  nickName?: string
}

export const getHumanName = (
  humanKin: HumanKin,
  gender: Gender,
  lang: ValidLanguage,
): Name => {
  if (humanKin === 'alderlander') {
    return getAlderlanderName(gender, lang)
  }

  return { id: nanoid(), firstName: '' }
}
const ALDERLANDER_NAME_TYPES: WeightedChoice<NameType>[] = [
  {
    value: 'familyName',
    weight: 5,
  },
  {
    value: 'firstName',
    weight: 49,
  },
  {
    value: 'homeName',
    weight: 5,
  },
]

const getAlderlanderName = (gender: Gender, lang: ValidLanguage): Name => {
  const type = getNameType(ALDERLANDER_NAME_TYPES)
  const firstName = choose(
    gender === 'female'
      ? ALDERLANDER_FEMALE_FIRSTNAMES
      : ALDERLANDER_MALE_FIRSTNAMES,
  )

  return {
    id: nanoid(),
    firstName,
    familyName:
      type === 'familyName' ? choose(ALDERLANDER_FAMILY_NAMES) : undefined,
    homeName: type === 'homeName' ? createRandomVillageName(lang) : undefined,
  }
}

type NameType = 'familyName' | 'firstName' | 'homeName'

const getNameType = (nameTypes: WeightedChoice<NameType>[]): NameType =>
  weightedRandom(nameTypes).value

const ALDERLANDER_MALE_FIRSTNAMES = [
  'Adalbern',
  'Alaric',
  'Alboin',
  'Baldarich',
  'Baldomar',
  'Clovis',
  'Eburwin',
  'Egino',
  'Erminigild',
  'Eward',
  'Faramund',
  'Fridumar',
  'Fulco',
  'Gerulf',
  'Gislin',
  'Haimo',
  'Hardmod',
  'Hariwald',
  'Horsa',
  'Hrodger',
  'Hrolf',
  'Ivo',
  'Joscelin',
  'Karl',
  'Kuno',
  'Landebert',
  'Lanzo',
  'Leudagar',
  'Lothar',
  'Manno',
  'Meginfrid',
  'Meino',
  'Odo',
  'Odoacer',
  'Ortwin',
  'Otmar',
  'Otto',
  'Raban',
  'Radulf',
  'Ranganhar',
  'Rochus',
  'Rudesind',
  'Sigdag',
  'Siward',
  'Tancred',
  'Trancmar',
  'Waldhar',
  'Waldo',
  'Wandal',
  'Warin',
]

const ALDERLANDER_FEMALE_FIRSTNAMES = [
  'Adela',
  'Adelais',
  'Adelina',
  'Aenor',
  'Alda',
  'Aldegund',
  'Amalia',
  'Amelina',
  'Auda',
  'Aveza',
  'Avila',
  'Berengaria',
  'Bertha',
  'Brunhild',
  'Brunhilde',
  'Clothildis',
  'Cunigund',
  'Ermendrud',
  'Ermingard',
  'Erminhilt',
  'Erminlinda',
  'Frida',
  'Geretrudis',
  'Gerhild',
  'Gerlind',
  'Gisila',
  'Godeliva',
  'Gunda',
  'Hadewig',
  'Hailwic',
  'Herleva',
  'Ida',
  'Ima',
  'Irma',
  'Ishild',
  'Leutgard',
  'Luitgard',
  'Lutgardis',
  'Mahthildis',
  'Oda',
  'Odila',
  'Raganhildis',
  'Roslindis',
  'Rosmunda',
  'Rothad',
  'Roza',
  'Saxa',
  'Sigilind',
  'Waldeburg',
  'Waldedrudis',
]

const ALDERLANDER_FAMILY_NAMES = [
  'Adogit',
  'Aelvaeones',
  'Batini',
  'Bergio',
  'Braemi',
  'Bui',
  'Chali',
  'Danduti',
  'Dani',
  'Eunixi',
  'Evagres',
  'Favonae ',
  'Fosi',
  'Grannii',
  'Hallin',
  'Hasdingi',
  'Helissi',
  'Heruli',
  'Hilleviones',
  'Ingriones',
  'Lemovii',
  'Levoni',
  'Manimi',
  'Mattiaci',
  'Naharvali',
  'Nemetes',
  'Njars',
  'Otingis',
  'Pharodini',
  'Quadi',
  'Racatae',
  'Racatriae',
  'Salii',
  'Scirii',
  'Segni',
  'Sigulones',
  'Suevi',
  'Taetel',
  'Teutons',
  'Thervingi',
  'Theustes',
  'Tubanti',
  'Ubi',
  'Vagoth',
  'Vangiones',
  'Varini',
  'Vinoiloth ',
  'Viruni',
  'Vispi ',
  'Zumi',
]
