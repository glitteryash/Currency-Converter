import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCurrencies } from "../../api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Culculate() {
  const [currencies, setCurrencies] = useState<string[]>(["JPY"]);
  const [selectedCurrency, setSelectedCurrency] = useState("JPY");
  const [loading, setLaoding] = useState(true);
  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(Object.keys(data));
      } catch (err) {
        console.error("Error fetching currencies:", err);
      } finally {
        setLaoding(false);
      }
    };
    getCurrencies();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center">通貨換算</h1>
      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-gray-500 border-t-blue-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => {
              return (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export default Culculate;
