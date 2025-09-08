import axios from "axios";

// APIのベースURLを環境変数から取得, 開発環境では空文字に設定, 本番環境ではVITE_API_URLを使用
const API_BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "";
