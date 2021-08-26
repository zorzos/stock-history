import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '../test/mocked.mock'
import { alphabetSearchResults, googleStockResults } from '../test/mockResponses'
import ChartComponent from './ChartComponent'
import { mapSearchStockResponse, mapStockHistoryResponse } from '../util/util'

beforeEach(() => {
    const googleSearchResult = mapSearchStockResponse(alphabetSearchResults)[7]
    const properHistoricalData = mapStockHistoryResponse(googleStockResults)
    render(
        <ChartComponent
            stockInfoLoadIndicator={false}
            stockHistory={properHistoricalData}
            stockInformation={googleSearchResult}
            selectStock={() => {console.log('Another stock or interval has been selected')}}
        />
    )
})

describe('When the Charts are rendered', () => {
    it('Should have a CanvasJS chart', () => {
        const canvasJSChart = document.querySelector('[class=\'candlestick-chart\']')
        expect(canvasJSChart).toBeTruthy()
        expect(canvasJSChart).toBeInTheDocument()
    })

    it('Should have an SVG chart', () => {
        const canvasJSChart = document.querySelector('[class=\'linear-chart\']')
        expect(canvasJSChart).toBeTruthy()
        expect(canvasJSChart).toBeInTheDocument()
    })
})