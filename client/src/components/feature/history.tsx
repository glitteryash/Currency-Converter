import { useEffect, useState } from "react";
import { fetchHistoricalRates } from "../../api/api";
type Props = {
  baseCurrency: string;
  targetCurrency: string;
};

function history({ baseCurrency, targetCurrency }: Props) {
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        const endDate = end.toISOString();
        const startDate = start.toISOString();
        console.log(startDate);
        console.log(endDate);
        console.log(baseCurrency, targetCurrency);
        const response = await fetchHistoricalRates(
          baseCurrency,
          targetCurrency,
          startDate,
          endDate
        );
        console.log("Historical Data:", response);
      } catch (err) {
        console.error("Error fetching historical rates:", err);
      }
    };
    fetchWeeklyData();
  }, [baseCurrency, targetCurrency, days]);
  const presets = [
    { label: "7日間", days: 7 },
    { label: "1ヶ月", days: 30 },
    { label: "3ヶ月", days: 90 },
  ];
  return (
    <div>
      <div>
        {presets.map((preset, index) => {
          return (
            <button
              className="cursor-pointer"
              key={index}
              onClick={() => setDays(preset.days)}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default history;
