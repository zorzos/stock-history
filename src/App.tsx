import React from 'react'
import { Row, Col, Divider, notification } from 'antd'
import SearchForm from './components/SearchForm'
import ResultsComponent from './components/results/ResultsComponent'
import ChartComponent from './components/ChartComponent';
import * as api from './api/api'
import { NotificationDetails, SearchResult, StockHistoryInformation } from './type';
import { mapStockHistoryResponse, mapSearchStockResponse } from './util/util';

function App() {
  const [stockSearchIndicator, setStockSearchIndicator] = React.useState(false)
  const [stockInfoLoadIndicator, setStockInfoLoadIndicator] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState([] as SearchResult[])
  const [stockInfo, setStockInfo] = React.useState({} as SearchResult)
  const [stockHistory, setStockHistory] = React.useState({} as StockHistoryInformation)

  const selectStock = (symbol: string, interval: string) => {
    setStockInfoLoadIndicator(true)
    const selectedStock = searchResults.filter(result => {
      return result.symbol === symbol
    })[0]
    setStockInfo(selectedStock)
    api.getStockInformation(symbol, interval)
    .then(getStockInformationResponse => {
      const modifiedHistory = mapStockHistoryResponse(getStockInformationResponse.data)
      setStockHistory(modifiedHistory)
      setStockInfoLoadIndicator(false)
    })
    .catch(() => {
      const details: NotificationDetails = {
        message: 'Error!',
        description: 'Something went wrong, please try again in a bit!'
      }
      setStockInfo({} as SearchResult)
      setStockHistory({} as StockHistoryInformation)
      setStockInfoLoadIndicator(false)
      notification.error(details)
    })
  }

  const searchStock = (stock: string) => {
    setSearchResults([])
    setStockSearchIndicator(true)
    setStockHistory({} as StockHistoryInformation)
    setStockInfo({} as SearchResult)
    setStockInfoLoadIndicator(false)
    api.searchStock(stock)
    .then(searchStockResponse => {
      const matches = mapSearchStockResponse(searchStockResponse.data.bestMatches)
      if (matches.length > 0) {
        setSearchResults(matches)
      } else {
        const details: NotificationDetails = {
          message: 'Error!',
          description: 'Given term does not match any stock, please try another one!'
        }
        notification.error(details)
      }
      setStockSearchIndicator(false)
    })
    .catch(() => {
      const details: NotificationDetails = {
        message: 'Error!',
        description: 'Something went wrong, please try again in a bit!'
      }
      notification.error(details)
      setStockSearchIndicator(false)
    })
  }

  return (
    <div className="App">
      <Row>
        <Col span={6}>
          <Row>
            <SearchForm
              searchStock={searchStock}
            />
          </Row>
          {/* {searchResults &&  */}
            <Row>
              <ResultsComponent
                searchResults={searchResults}
                stockSearchIndicator={stockSearchIndicator}
                selectStock={selectStock}
              />
            </Row>
          {/* } */}
        </Col>
        {searchResults &&
          <Divider type="vertical" />
        }
        <Col span={17}>
          <ChartComponent
            stockInfoLoadIndicator={stockInfoLoadIndicator}
            stockInformation={stockInfo}
            stockHistory={stockHistory}
            selectStock={selectStock}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
