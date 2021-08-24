import CanvasJSReact from '../canvasjs.stock.react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SearchResult, StockHistoryInformation } from '../type'
import { extractChartData } from '../util/util'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

function ChartComponent(props: {
    stockInfoLoadIndicator: boolean,
    stockInformation: SearchResult,
    stockHistory: StockHistoryInformation
}) {
    const { stockInfoLoadIndicator, stockInformation, stockHistory } = props

    const getCurrencySymbol = () => {
        if (stockInformation && stockInformation['8. currency']) {
            const temp = 
                Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: stockInformation['8. currency']
                }).format(0)
            
            let currencySymbol = "";
            for (let i = 0; i < temp.length; i++) {
                if (!isNaN(+temp[i])) {
                    return currencySymbol = temp.substring(0, i)
                }
            }

            return currencySymbol
        }
    }

    const chartConfig = {
        title: { 
            text: `
                ${stockInformation['1. symbol']} Stock History (${stockInformation['2. name']}) in ${stockInformation['8. currency']}
            `,
            fontFamily: 'segoe ui',
            fontWeight: 'bold'
        },
        zoomEnabled: true,
        exportEnabled: true,
        axisY: { title: "Prices", prefix: getCurrencySymbol() },
        axisX: { title: "Time", labelAngle: -45 },
        data: [{
            type: "candlestick",
            dataPoints: extractChartData(stockHistory['Time Series (Daily)'])
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
            {!stockInfoLoadIndicator && stockHistory['Meta Data'] && stockHistory['Time Series (Daily)'] &&
                <div className="chart">
                    <CanvasJSChart
                        options={chartConfig}
                    /><br />
                    <p>Last refreshed: {stockHistory['Meta Data']['3. Last Refreshed']}</p>
                </div>
            }
        </>
    )
}

export default ChartComponent