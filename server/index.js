import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const convertURL = process.env.API_CONVERT;
const latestURL = process.env.API_LATEST;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/latest", async (req, res) => {
  const { base_currency, currencies } = req.query;
  try {
    const response = await axios.get(
      `${latestURL}?${base_currency}&${currencies}`,
      {
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );
    if (!response)
      return res.status(404).json({ message: "データが見つかりません" });
    res.status(200).json(response.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// app.get("/api/convert", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
