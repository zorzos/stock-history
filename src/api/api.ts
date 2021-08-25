import axios from 'axios'

const baseURL = 'https://www.alphavantage.co/query?'
const apiKey = 'GSTJX25CQGFEJK9A'

const constructSearchStockURL = (keyword: string) => {
    return baseURL
        .concat("function=SYMBOL_SEARCH")
        .concat("&keywords=")
        .concat(keyword)
        .concat(`&apikey=${apiKey}`) 
}

const constructStockHistoryURL = (symbol: string, interval: string) => {
    return baseURL
        .concat("function=TIME_SERIES_INTRADAY")
        .concat(`&symbol=${symbol}`)
        .concat(`&interval=${interval}`)
        .concat("&outputsize=compact")
        .concat(`&apikey=${apiKey}`)
}

export const searchStock = (searchTerm: string) => axios.get(constructSearchStockURL(searchTerm))

export const getStockInformation = (symbol: string, interval: string) => axios.get(constructStockHistoryURL(symbol, interval))