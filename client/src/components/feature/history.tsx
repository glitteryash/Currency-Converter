import { useEffect, useState } from "react";
import { fetchHistoricalRates } from "../../api/api";
type Props = {
  baseCurrency: string;
  targetCurrency: string;
};

function history({ baseCurrency, targetCurrency }: Props) {
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const results: string[] = [];
        const today = new Date();
        today.setDate(today.getDate() - 1); //前日までのデータを取得のため

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const formattedDate = date.toISOString().split("T")[0];
          results.push(formattedDate);
        }
        results.reverse();
        const historicalRates = await Promise.all(
          results.map((date) =>
            fetchHistoricalRates(baseCurrency, targetCurrency, date)
          )
        );
        console.log("Historical Rates:", historicalRates);
      } catch (err) {
        console.error("Error fetching historical rates:", err);
      }
    };
    fetchWeeklyData();
  }, [baseCurrency, targetCurrency]);

  return <div></div>;
}

export default history;
