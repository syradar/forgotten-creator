import { render } from '@testing-library/react'
import { Card, CardHeader } from '../Card'

describe('Card', () => {
  it('renders', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>Card Header</CardHeader>
      </Card>,
    )

    expect(getByText('Card Header')).toBeInTheDocument()
  })
})

describe('CardHeader', () => {
  it('renders', () => {
    const { getByText } = render(<CardHeader>Card Header</CardHeader>)

    expect(getByText('Card Header')).toBeInTheDocument()
  })
})
