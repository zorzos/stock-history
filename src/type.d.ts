export interface SearchResult {
    symbol: string
    name: string
    type: string
    region: string
    marketOpen: string
    marketClose: string
    timezone: string
    currency: string
}

export interface NotificationDetails {
    message: string
    description: string
}

export interface StockInfoItemResponse {
    date?: Date
    open?: number
    high?: number
    low?: number
    close?: number
    adjustedClose?: number
    volume?: number
    dividentAmount?: number
    splitCoefficient?: number
}

export interface StockHistoryInformation {
    lastRefreshed: string
    historyData: StockInfoItemResponse[]
}

export interface LinearChartPoint {
    label: string
    x: number
    y: number
}