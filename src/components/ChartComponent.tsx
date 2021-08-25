import React from 'react'
import CanvasJSReact from '../canvasjs.stock.react'
import { Spin, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SearchResult, StockHistoryInformation } from '../type'
import { extractCandlestickChartData, extractLinearChartData } from '../util/util'
import Chart from './LinearChart'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

function ChartComponent(props: {
    stockInfoLoadIndicator: boolean,
    stockInformation: SearchResult,
    stockHistory: StockHistoryInformation,
    selectStock: (stock: string, interval: string) => void
}) {
    const { stockInfoLoadIndicator, stockInformation, stockHistory } = props
    const [activeInterval, setActiveInterval] = React.useState("60min")

    const getIntervalButtons = () => {
        const timeIntervals = ['60min', '30min', '15min', '5min', '1min']
        const buttons = []
        for (let interval in timeIntervals) {
            const intervalValue = timeIntervals[interval]
            buttons.push(
                <Button
                    key={interval}
                    disabled={isButtonDisabled(intervalValue)}
                    onClick={() => intervalClicked(intervalValue)}
                >
                    {intervalValue}
                </Button>
            )
        }

        return buttons
    }

    const isButtonDisabled = (value: string) => {
        return value === activeInterval ? true : false
    }

    const intervalClicked = (value: string) => {
        setActiveInterval(value)
        props.selectStock(stockInformation.symbol, value)
    }

    const getCurrencySymbol = () => {
        if (stockInformation && stockInformation.currency) {
            const temp = 
                Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: stockInformation.currency
                }).format(0)
            
            let currencySymbol = "";
            for (let i = 0; i < temp.length; i++) {
                if (!isNaN(+temp[i])) { return currencySymbol = temp.substring(0, i) }
            }

            return currencySymbol
        }
    }

    const currencySymbol = getCurrencySymbol()

    const chartConfig = {
        title: { 
            text: `
                ${stockInformation.symbol} Stock History (${stockInformation.name}) in ${stockInformation.currency}
            `,
            fontFamily: 'segoe ui',
            fontWeight: 'bold'
        },
        zoomEnabled: true,
        exportEnabled: true,
        axisY: { title: "Prices", prefix: currencySymbol },
        axisX: { title: "Time", labelAngle: -45 },
        data: [{
            type: "candlestick",
            dataPoints: extractCandlestickChartData(stockHistory.historyData)
        }]
    }

    return (
        <>
            {stockInfoLoadIndicator &&
                <Spin
                indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
                className="spinner"
                />
            }
            {!stockInfoLoadIndicator && stockHistory.lastRefreshed && stockHistory.historyData &&
                <>
                    <div className="candlestick-chart">
                        <CanvasJSChart
                            options={chartConfig}
                        /><br />
                    </div>
                    <br />
                    <div className="linear-chart">
                        <Chart
                            width={10000}
                            height={3200}
                            data={extractLinearChartData(stockHistory.historyData)}
                            horizontalGuides={5}
                            precision={2}
                            verticalGuides={15}
                            currencySymbol={currencySymbol}
                        />
                    </div>
                    <p>Last refreshed: {stockHistory.lastRefreshed}</p>
                    <p>Switch interval duration:</p>
                    {getIntervalButtons()}
                </>
            }
        </>
    )
}

export default ChartComponent