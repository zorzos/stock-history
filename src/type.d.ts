export interface SearchResult {
    '1. symbol': string
    '2. name': string
    '3. type': string
    '4. region': string
    '5. marketOpen': string
    '6. marketClose': string
    '7. timezone': string
    '8. currency': string
}

export interface NotificationDetails {
    message: string
    description: string
}

export interface StockInfoMetaData {
    '3. Last Refreshed': string
}

export interface StockInfoDaily {
    date: Date
    open: number
    high: number
    low: number
    close: number
    adjustedClose: number
    volume: number
    dividentAmount: number
    splitCoefficient: number
}

export interface StockHistoryInformation {
    'Meta Data': StockInfoMetaData,
    'Time Series (Daily)': StockInfoDaily[]
}