interface StackProps {
  children: React.ReactNode
  justify?: boolean
  gap?: StackGap
}

type StackGap = 'none' | 'small' | 'medium' | 'large'

const createStack = ({ vertical }: { vertical: boolean }) => {
  const StackComponent = ({
    children,
    justify = false,
    gap = 'medium',
  }: StackProps) => {
    return (
      <div
        className={`flex
    ${vertical ? 'flex-col' : 'flex-row'}
    ${justify ? 'justify-between' : ''}
    ${gap === 'small' ? 'gap-2' : ''}
    ${gap === 'medium' ? 'gap-4' : ''}
    ${gap === 'large' ? 'gap-8' : ''}
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
