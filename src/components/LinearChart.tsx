import React from "react"
import { LinearChartPoint } from "../type";

const STROKE = 1;

const Chart = (props: {
    data: LinearChartPoint[],
    height: number,
    width: number,
    horizontalGuides: number,
    verticalGuides: number,
    precision: number,
    currencySymbol: string | undefined
}) => {
    const { data, width, height, horizontalGuides, verticalGuides, precision, currencySymbol } = props
    const FONT_SIZE = 100;
    const maximumXFromData = Math.max(...data.map(e => e.x));
    const maximumYFromData = Math.max(...data.map(e => e.y));

    const digits = parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

    const padding = (FONT_SIZE + digits) * 3;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map(element => {
        const x = (element.x / maximumXFromData) * chartWidth + padding;
        const y = chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
        return `${x},${y}`
    }).join(" ")

    const Axis = (props: {points: string}) => (
        <polyline fill="none" stroke="blue" strokeWidth=".5" points={points} />
    )

    const XAxis = () => ( <Axis points={`${padding},${height - padding} ${width - padding},${height - padding}`} /> )

    const YAxis = () => ( <Axis points={`${padding},${padding} ${padding},${height - padding}`} /> )

    const getVerticalGuides = () => {
        const guideCount = verticalGuides || data.length - 1;
        const startY = padding;
        const endY = height - padding;

        return new Array(guideCount).fill(0).map((_, index) => {
            const ratio = (index + 1) / guideCount;
            const xCoordinate = padding + ratio * (width - padding * 2);

            return (
                <React.Fragment key={index}>
                    <polyline
                        fill="none"
                        stroke="#000"
                        strokeWidth=".5"
                        points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
                    />
                </React.Fragment>
            )
        })
    }

    const getHorizontalGuides = () => {
        const startX = padding;
        const endX = width - padding;

        return new Array(horizontalGuides).fill(0).map((_, index) => {
            const ratio = (index + 1) / horizontalGuides;
            const yCoordinate = chartHeight - chartHeight * ratio + padding;
            return (
                <React.Fragment key={index}>
                    <polyline
                        fill="none"
                        stroke="#000"
                        strokeWidth=".5"
                        points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
                    />
                </React.Fragment>
            )
        })
    }

    const getLabelsXAxis = () => {
        const y = height - padding + FONT_SIZE * 2;
        return data.map((element, index) => {
            const x = (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
            return (
                <text
                    className="xAxis-label"
                    key={index}
                    x={x}
                    y={y}
                    style={{
                        transform: "rotate(-90deg)",
                        fill: "#000",
                        fontSize: FONT_SIZE,
                        fontFamily: "Segoe UI",
                        transformOrigin: "left",
                        transformBox: "fill-box"
                    }}
                >
                    {element.label}
                </text>
            )
        })
    }

    const getLabelsYAxis = () => {
        const PARTS = horizontalGuides
        return new Array(PARTS + 1).fill(0).map((_, index) => {
            const x = FONT_SIZE
            const ratio = index / horizontalGuides
            const yCoordinate = chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
            return (
                <text
                    key={index}
                    x={x}
                    y={yCoordinate}
                    style={{
                        fill: "#000",
                        fontSize: FONT_SIZE,
                        fontFamily: "Segoe UI"
                    }}
                >
                    {currencySymbol}{(maximumYFromData * (index / PARTS)).toFixed(precision)}
                </text>
            )
        })
    }

    return (
        <>
            <h1 style={{textAlign: 'center', marginBottom: '-1em', color: "black"}}>Average Stock Price</h1>
            <svg viewBox={`0 0 ${width} ${height}`}>
                <XAxis />
                {getLabelsXAxis()}
                <YAxis />
                {getLabelsYAxis()}
                {getVerticalGuides()}
                {getHorizontalGuides()}

                <polyline
                    fill="none"
                    stroke="blue"
                    strokeWidth={STROKE}
                    points={points}
                />
            </svg>
        </>
    )
}

export default Chart