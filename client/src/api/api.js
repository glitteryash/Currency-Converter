import axios from "axios";

// APIのベースURLを環境変数から取得, 開発環境では空文字に設定, 本番環境ではVITE_API_URLを使用
const API_BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "";

// 通貨リストを取得する関数
export const fetchCurrencies = async () => {
  try {
    console.log("Sending request to:", `${API_BASE_URL}/api/currencies`);
    const response = await axios.get(`${API_BASE_URL}/api/currencies`);
    return response.data;
  } catch (error) {
    throw new Error("通貨リストの取得に失敗しました:" + error.message);
  }
};

export const convertCurrency = async (baseCurrency, targetCurrency) => {
  try {
    console.log("API_BASE_URL:", API_BASE_URL);
    const response = await axios.get(`${API_BASE_URL}/api/latest`, {
      params: { baseCurrency, targetCurrency },
    });
    return response.data;
  } catch (error) {
    throw new Error("通貨変換に失敗しました:" + error.message);
  }
};
