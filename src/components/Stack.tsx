interface StackProps {
  children: React.ReactNode
  justify?: boolean
  gap?: StackGap
}

type StackGap = 'small' | 'medium' | 'large'

const gapMap: { [key in StackGap]: string } = {
  small: '2',
  medium: '4',
  large: '8',
}

const createStack = ({ vertical }: { vertical: boolean }) => {
  const StackComponent = ({
    children,
    justify = false,
    gap = 'medium',
  }: StackProps) => {
    const gapClass = `gap-${gapMap[gap]}`
    return (
      <div
        className={`flex
    ${gapClass}
    ${vertical ? 'flex-col' : 'flex-row'}
    ${justify ? 'justify-between' : ''}
    `}
      >
        {children}
      </div>
    )
  }

  return StackComponent
}

const VerticalStack = createStack({ vertical: true })
const HorizontalStack = createStack({ vertical: false })

export const Stack = {
  Vertical: VerticalStack,
  Horizontal: HorizontalStack,
}
