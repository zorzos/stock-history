import { 
    StockInfoItemResponse,
    StockHistoryInformation,
    SearchResult,
    LinearChartPoint
} from "../type"

const mapSearchStockResponse = (response: any) => {
    let searchResults: SearchResult[] = []
    for (let key in response) {
        searchResults.push({
            symbol: response[key]['1. symbol'],
            name: response[key]['2. name'],
            type: response[key]['3. type'],
            region: response[key]['4. region'],
            marketOpen: response[key]['5. marketOpen'],
            marketClose: response[key]['6. marketClose'],
            timezone: response[key]['7. timezone'],
            currency: response[key]['8. currency']
        })
    }

    return searchResults
}

const mapStockHistoryResponse = (response: any) => {
    let historyInformation: StockHistoryInformation = { lastRefreshed: '', historyData: [] }
    const newHistoryItems: StockInfoItemResponse[] = []
    let responseItems = undefined
    if (response['Time Series (60min)']) {
        responseItems = response['Time Series (60min)']
    } else if (response['Time Series (30min)']) {
        responseItems = response['Time Series (30min)']
    } else if (response['Time Series (15min)']) {
        responseItems = response['Time Series (15min)']
    } else if (response['Time Series (5min)']) {
        responseItems = response['Time Series (5min)']
    } else if (response['Time Series (1min)']) {
        responseItems = response['Time Series (1min)']
    }

    for (let key in responseItems) {
        newHistoryItems.push({
            date: new Date(key),
            open: parseFloat(responseItems[key]["1. open"]),
            high: parseFloat(responseItems[key]["2. high"]),
            low: parseFloat(responseItems[key]["3. low"]),
            close: parseFloat(responseItems[key]["4. close"]),
            adjustedClose: parseFloat(responseItems[key]["5. adjusted close"]),
            volume: parseFloat(responseItems[key]["6. volume"]),
            dividentAmount: parseFloat(responseItems[key]["7. dividend amount"]),
            splitCoefficient: parseFloat(responseItems[key]["8. split coefficient"])
        })
    }
    historyInformation.historyData = newHistoryItems
    historyInformation.lastRefreshed = response['Meta Data']['3. Last Refreshed']
    return historyInformation
}

const extractCandlestickChartData = (stockHistory: StockInfoItemResponse[]) => {
    let x, y
    const points: any[] = []
    stockHistory && stockHistory.length > 0 && stockHistory.forEach((item: StockInfoItemResponse) => {
        x = item.date
        y = [item.open, item.high, item.low, item.close]
        points.push({ x, y })
    })

    return points
}

const numberFormatter = (value: number) => {
    if (value < 10) { return "0"+value }
    return value
}

const extractLinearChartData = (stockHistory: StockInfoItemResponse[]) => {
    let label, x, y
    const points: LinearChartPoint[] = []
    const tempPoints: any[] = []
    stockHistory && stockHistory.length > 0 && stockHistory.forEach((item: StockInfoItemResponse) => {
        if (item.date && item.high && item.low) {
            const itemDate = new Date(item.date)
            label = itemDate.getFullYear() + "/" + (itemDate.getMonth()+1) + "/" + itemDate.getDate() + " " +
                    numberFormatter(itemDate.getHours()) + ":" +
                    numberFormatter(itemDate.getMinutes()) + ":" +
                    numberFormatter(itemDate.getSeconds())
            x = itemDate
            y = (item.high + item.low) / 2
            tempPoints.push({label, x, y})
        }
    })
    tempPoints.sort((a, b) => a.x - b.x)
    tempPoints.forEach((tempPoint, index) => {
        points.push({
            label: tempPoint.label,
            x: index+1,
            y: tempPoint.y
        })
    })



    return points
}

export  {
    mapStockHistoryResponse,
    mapSearchStockResponse,
    extractCandlestickChartData,
    extractLinearChartData
}