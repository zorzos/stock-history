import { Card } from 'antd'
import { SearchResult } from '../../type'

function ResultItem(props: {
    item: SearchResult,
    selectStock: (symbol: string) => void
}) {
    const { item } = props
    return (
        <span
            onClick={() => props.selectStock(item['1. symbol'])}
        >
            <Card.Grid
                className="card-grid"
                hoverable={false}
            >
                Title: {item['2. name']}<br />
                Symbol: {item['1. symbol']}<br />
                Region: {item['4. region']}
            </Card.Grid>
        </span>
    )
}

export default ResultItem