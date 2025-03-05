import React from "react";
import StockPage from "./pages/StockPage";

function App() {
  return (
    <div>
      <h1>Stock Analysis Dashboard</h1>
      <StockPage stockSymbol="AAPL" /> {/* Change to any stock */}
    </div>
  );
}

export default App;
