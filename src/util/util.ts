import { StockInfoDaily } from "../type"

const mapStockHistoryResponse = (response: any) => {
    const newHistoryItems: StockInfoDaily[] = []
    for (let key in response['Time Series (Daily)']) {
        newHistoryItems.push({
            date: new Date(key),
            open: parseFloat(response['Time Series (Daily)'][key]["1. open"]),
            high: parseFloat(response['Time Series (Daily)'][key]["2. high"]),
            low: parseFloat(response['Time Series (Daily)'][key]["3. low"]),
            close: parseFloat(response['Time Series (Daily)'][key]["4. close"]),
            adjustedClose: parseFloat(response['Time Series (Daily)'][key]["5. adjusted close"]),
            volume: parseFloat(response['Time Series (Daily)'][key]["6. volume"]),
            dividentAmount: parseFloat(response['Time Series (Daily)'][key]["7. dividend amount"]),
            splitCoefficient: parseFloat(response['Time Series (Daily)'][key]["8. split coefficient"])
        })
    }
    response['Time Series (Daily)'] = newHistoryItems
    return response
}

const extractChartData = (stockHistory: StockInfoDaily[]) => {
    let x, y = undefined
    const points: any[] = []
    stockHistory && stockHistory.forEach((item: StockInfoDaily) => {
        x = item.date
        y = [item.open, item.high, item.low, item.close]
        points.push({ x, y })
    })

    return points
}

export  {
    mapStockHistoryResponse,
    extractChartData
}