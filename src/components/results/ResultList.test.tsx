import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '../../test/mocked.mock'
import { alphabetSearchResults } from '../../test/mockResponses'
import ResultList from './ResultList'
import { mapSearchStockResponse } from '../../util/util'

beforeEach(() => {
    const properResults = mapSearchStockResponse(alphabetSearchResults)
    render(
        <ResultList
            results={properResults}
            selectStock={() => console.log("A stock's 'View' button was clicked - using mock data from src/test/mockResponses.tsx")}
        />
    )
})

describe('When the results are rendered', () => {
    it('Checks that there is a valid results list', () => {
        const results = screen.getByRole('tablist')
        expect(results).toBeInTheDocument()
    })

    it('Finds the GOOGL result among them', () => {
        const googleResult = screen.getByRole('tab', { name: /right GOOGL View/ })
        expect(googleResult).toBeInTheDocument()
    })

    it('Clicks the GOOGL result to expand it', () => {
        const googleResultText = screen.getByText('GOOGL')
        expect(googleResultText).toBeInTheDocument()
        userEvent.click(googleResultText)
        const googleResult = screen.getByRole('tab', { name: /right GOOGL View/ })
        expect(googleResult).toHaveAttribute('aria-expanded', "true")
    })

    it('Clicks the \'View\' button of the GOOGL result record', () => {
        const googleResult = screen.getByRole('tab', { name: /right GOOGL View/ })
        const viewButton = googleResult.querySelector('[class=\'ant-btn ant-btn-primary\'')
        expect(viewButton).toBeTruthy()
        expect(viewButton).toBeInTheDocument()
        if (viewButton) {
            userEvent.click(viewButton)
        }
    })
})