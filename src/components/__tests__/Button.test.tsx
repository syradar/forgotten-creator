import { render } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders', () => {
    const { getByText } = render(<Button onClick={() => null}>Button</Button>)

    expect(getByText('Button')).toBeInTheDocument()
  })

  it('sends onClick event', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}>Button</Button>)

    getByText('Button').click()

    expect(onClick).toHaveBeenCalled()
  })
})
