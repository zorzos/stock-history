import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import './test/mocked.mock'
import App from './App'

beforeEach(() => {
  render(<App />)
})

describe('When App is rendered', () => {
  it('Checks for title', () => {
    const heading = screen.getByRole('heading', { name: /Stock History/ })
    expect(heading).toBeTruthy
  })

  it('Enters a stock value to search', () => {
    const stockTextbox = screen.getByRole('textbox', { name: /Search for a stock using symbol\/keywords/ })
    expect(stockTextbox).toBeInTheDocument()
    expect(stockTextbox).toBeTruthy
    userEvent.type(stockTextbox, 'alphabet')
  })

  it('Clicks the Search button', () => {
    const searchButton = screen.getByRole('button', { name: /submit/i })
    // expect(stockTextbox).toHaveValue('alphabet')
    userEvent.click(searchButton)
  })
})