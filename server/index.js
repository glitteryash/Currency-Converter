import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const historicalURL = process.env.API_RANGE;
const latestURL = process.env.API_LATEST;
const currenciesURL = process.env.API_CURRENCIES;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("後端收到請求:", req.method, req.url);
  next();
});

// 通貨を取得するエンドポイント
app.get("/api/currencies", async (req, res) => {
  try {
    const response = await axios.get(currenciesURL, {
      headers: {
        apikey: process.env.API_KEY,
      },
    });
    if (!response.data?.data)
      return res.status(404).json({ message: "データが見つかりません" });
    res.status(200).json(response.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 最新の為替レートを取得するエンドポイント
app.get("/api/latest", async (req, res) => {
  const { baseCurrency, targetCurrency } = req.query;
  try {
    const response = await axios.get(latestURL, {
      headers: {
        apikey: process.env.API_KEY,
      },
      params: {
        base_currency: baseCurrency,
        currencies: targetCurrency,
      },
    });
    console.log(response.data);

    if (!response.data)
      return res.status(404).json({ message: "データが見つかりません" });
    res.status(200).json(response.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 指定された期間の為替レートを取得するエンドポイント
app.get("/api/history", async (req, res) => {
  const { baseCurrency, targetCurrency, date } = req.query;
  console.log("/api/range called with params:", {
    baseCurrency,
    targetCurrency,
    date,
  });
  try {
    const response = await axios.get(historicalURL, {
      headers: { apikey: process.env.API_KEY },
      params: {
        base_currency: baseCurrency,
        currencies: targetCurrency,
        date: date,
      },
    });
    console.log(response.data);
    if (!response.data)
      return res.status(404).json({ message: "データが見つかりません" });
    res.status(200).json(response.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
