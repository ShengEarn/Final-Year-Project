import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const StockPage = ({ stockSymbol }) => {
  const [stockData, setStockData] = useState([]);
  const [news, setNews] = useState([]);
  const [pattern, setPattern] = useState(null);
  const [lstmPrediction, setLstmPrediction] = useState(null);

  useEffect(() => {
    // Fetch stock price data
    axios.get(`http://127.0.0.1:8000/get_stock_data/${stockSymbol}`)
      .then(response => setStockData(response.data))
      .catch(error => console.error("Stock Data Error:", error));

    // Fetch latest news & sentiment
    axios.get(`http://127.0.0.1:8000/get_news/${stockSymbol}`)
      .then(response => setNews(response.data))
      .catch(error => console.error("News Data Error:", error));

    // Fetch chart pattern detection
    axios.get(`http://127.0.0.1:8000/get_chart_pattern/${stockSymbol}`)
      .then(response => setPattern(response.data))
      .catch(error => console.error("Pattern Data Error:", error));

    // Fetch LSTM Prediction
    axios.get(`http://127.0.0.1:8000/get_lstm_prediction/${stockSymbol}`)
      .then(response => setLstmPrediction(response.data))
      .catch(error => console.error("LSTM Prediction Error:", error));
  }, [stockSymbol]);

  return (
    <div style={{ display: "flex" }}>
      {/* Left Side: Stock Chart */}
      <div style={{ flex: 1 }}>
        <h2>{stockSymbol} Stock Chart</h2>
        {stockData.length > 0 ? (
          <Plot
            data={[
              {
                x: stockData.map(d => d.Date),
                open: stockData.map(d => d.Open),
                high: stockData.map(d => d.High),
                low: stockData.map(d => d.Low),
                close: stockData.map(d => d.Close),
                type: "candlestick",
              },
            ]}
            layout={{ title: `${stockSymbol} Candlestick Chart` }}
          />
        ) : <p>Loading chart...</p>}
      </div>

      {/* Right Side: News, Sentiment, Patterns, Predictions */}
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h2>Latest News & Sentiment</h2>
        {news.length > 0 ? (
          <ul>
            {news.map((n, index) => (
              <li key={index}>
                <a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a> - Sentiment: {n.sentiment}
              </li>
            ))}
          </ul>
        ) : <p>Loading news...</p>}

        <h2>Chart Pattern Detection</h2>
        {pattern ? <p>Pattern: {pattern.type} ({pattern.trend})</p> : <p>Loading pattern...</p>}

        <h2>LSTM Prediction</h2>
        {lstmPrediction ? <p>Prediction: {lstmPrediction.trend}</p> : <p>Loading prediction...</p>}
      </div>
    </div>
  );
};

export default StockPage;
