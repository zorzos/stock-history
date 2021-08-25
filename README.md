# Stock History

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This small project makes use of the [Alpha Vantage](https://www.alphavantage.co/documentation/) API in order to fetch historical stock data and then displays Two charts, a candlestick chart created using [CanvasJS](https://canvasjs.com) and a linear graph created using an SVG viewbox from scratch.

With this app you are able to search by and stock symbol/code/security/keyword and then select a specific stock from the search results. After you select a stock, the application renders a candlestick chart showing the latest historical data of the stock in hourly intervals which is the default value. It also supports switching to 30 minute, 15 minute, 5 minute and 1 minute intervals.

---

To initialise the project, download the source code and assuming you have npm installed on your machine, run:

```
npm install
```

Afterwards, to run the application simply run:

```
npm start
```

