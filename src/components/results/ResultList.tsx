import { Collapse, Button } from 'antd'
import { SearchResult } from '../../type'
const { Panel } = Collapse

function ResultList(props: {
    results: SearchResult[],
    selectStock: (symbol: string, interval: string) => void
}) {
    const generateViewButton = (symbol: string) => {
        return (<Button
            type="primary"
            htmlType="submit"
            onClick={() => props.selectStock(symbol, "60min")}
        >
            View
        </Button>)
    }
    return (
        <>
            <h3>Select a stock from the results below to view its history:</h3>
            <Collapse className="results-accordion" collapsible="header" accordion>
                {props.results.map(result => {
                    const resultSymbol = result.symbol
                    return (
                        <Panel
                            header={resultSymbol}
                            key={resultSymbol}
                            extra={generateViewButton(resultSymbol)}
                        >
                            Name: {result.name}<br />
                            Symbol: {resultSymbol}<br />
                            Region: {result.region}<br />
                            Currency: {result.currency}
                        </Panel>
                    )
                })}
            </Collapse>
        </>
    )
}

export default ResultList