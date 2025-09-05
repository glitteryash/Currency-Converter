import React from "react";
import { useEffect } from "react";
import axios from "axios";

function Culculate() {
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("/api/currencies");
      } catch (err) {}
    };
  }, []);
  return <div>通貨換算</div>;
}

export default Culculate;
