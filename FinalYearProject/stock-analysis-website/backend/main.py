from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load stock data for multiple stocks
stock_data = {
    "AAPL": pd.read_csv("../../cleaned_data/AAPL_full_history_cleaned.csv", parse_dates=["Date"]),
    "MSFT": pd.read_csv("../../cleaned_data/MSFT_full_history_cleaned.csv", parse_dates=["Date"])
}

@app.get("/get_stock_data/{stock_symbol}")
def get_stock_data(stock_symbol: str):
    """Fetch stock data for a specific stock."""
    df = stock_data.get(stock_symbol.upper(), None)
    if df is None:
        return {"error": "Stock not found"}
    return df.to_dict(orient="records")

@app.get("/get_news/{stock_symbol}")
def get_news(stock_symbol: str):
    """Mock News API (Replace with real implementation)"""
    return [
        {"title": f"{stock_symbol} is surging!", "url": "https://example.com", "sentiment": "Bullish"},
        {"title": f"Analysts worry about {stock_symbol} downturn", "url": "https://example.com", "sentiment": "Bearish"}
    ]

@app.get("/get_chart_pattern/{stock_symbol}")
def get_chart_pattern(stock_symbol: str):
    """Mock Chart Pattern API (Replace with AI model)"""
    return {"type": "Head & Shoulders", "trend": "Bearish"}

@app.get("/get_lstm_prediction/{stock_symbol}")
def get_lstm_prediction(stock_symbol: str):
    """Mock LSTM Prediction API (Replace with real LSTM model)"""
    return {"trend": "Bullish"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
