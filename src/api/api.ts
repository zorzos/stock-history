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

const constructStockHistoryURL = (symbol: string) => {
    return baseURL
        .concat("function=TIME_SERIES_DAILY_ADJUSTED")
        .concat("&symbol=")
        .concat(symbol)
        .concat("&outputSize=full")
        .concat(`&apikey=${apiKey}`)
}

export const searchStock = (searchTerm: string) => axios.get(constructSearchStockURL(searchTerm))

export const getStockInformation = (symbol: string) => axios.get(constructStockHistoryURL(symbol))