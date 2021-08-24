import { Spin, Divider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SearchResult } from "../../type"
import ResultList from './ResultList'

function ResultsComponent(props: {
    searchResults: SearchResult[],
    stockSearchIndicator: boolean,
    selectStock: (symbol: string) => void
}) {
    const { searchResults, stockSearchIndicator } = props
    return (
        <>
            
            {searchResults && searchResults.length > 0 && 
                <>
                    <Divider />
                    <ResultList
                        results={searchResults}
                        selectStock={props.selectStock}
                    />
                </>
            }
            {stockSearchIndicator &&
                <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
                    className="spinner"
                />
            }
        </>
    )
}

export default ResultsComponent