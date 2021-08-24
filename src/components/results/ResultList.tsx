import { Collapse, Button } from 'antd'
import { SearchResult } from '../../type'
const { Panel } = Collapse

function ResultList(props: {
    results: SearchResult[],
    selectStock: (symbol: string) => void
}) {
    const generateViewButton = (symbol: string) => {
        return (<Button
            type="primary"
            htmlType="submit"
            onClick={() => props.selectStock(symbol)}
        >
            View
        </Button>)
    }
    return (
        <>
            <h3>Select a stock from the results below to view its history:</h3>
            <Collapse className="results-accordion" collapsible="header" accordion>
                {props.results.map(result => {
                    return (
                        <Panel
                            header={result['1. symbol']}
                            key={result['1. symbol']}
                            extra={generateViewButton(result['1. symbol'])}
                        >
                            Name: {result['2. name']}<br />
                            Symbol: {result['1. symbol']}<br />
                            Region: {result['4. region']}<br />
                            Currency: {result['8. currency']}
                        </Panel>
                    )
                })}
            </Collapse>
        </>
    )
}

export default ResultList