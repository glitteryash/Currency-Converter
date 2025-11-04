import { useEffect, useState } from "react";
import { fetchCurrencies, convertCurrency } from "../../api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  baseCurrency: string;
  setBaseCurrency: (v: string) => void;
  targetCurrency: string;
  setTargetCurrency: (v: string) => void;
};

function Culculate({
  baseCurrency,
  setBaseCurrency,
  targetCurrency,
  setTargetCurrency,
}: Props) {
  const [currencies, setCurrencies] = useState<string[]>(["JPY"]);
  const [value, setValue] = useState(1);
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrencies = async () => {
      const localCurrencies = localStorage.getItem("currencies");
      console.log("localCurrencies:", localCurrencies);
      if (localCurrencies) {
        setCurrencies(JSON.parse(localCurrencies));
        setLoading(false);
        return;
      }
      try {
        const data = await fetchCurrencies();
        setCurrencies(Object.keys(data));
        //save to localStorage
        localStorage.setItem("currencies", JSON.stringify(Object.keys(data)));
      } catch (err) {
        console.error("Error fetching currencies:", err);
      } finally {
        setLoading(false);
      }
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    const getConvertedAmount = async () => {
      try {
        setLoading(true);
        const data = await convertCurrency(baseCurrency, targetCurrency);
        console.log(data[targetCurrency].value);
        setRate(data[targetCurrency].value);
      } catch (err) {
        console.error("Error converting currency:", err);
      } finally {
        setLoading(false);
      }
    };
    getConvertedAmount();
  }, [targetCurrency, baseCurrency]);

  useEffect(() => {
    if (rate !== null) {
      const result = rate * value;
      setTargetAmount(result.toFixed(4));
    }
  }, [rate, value]);

  const handleAmountChange = (e) => {
    const v = e.target.value === "" ? "" : Number(e.target.value);
    setValue(v === "" ? 0 : v);
  };

  const handleReverseCurrencies = () => {
    const oldBase = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(oldBase);
  };

  return (
    <div>
      <h1 className="flex justify-center">通貨換算</h1>
      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-gray-500 border-t-blue-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-4 gap-y-4">
          <div className="flex gap-4 w-full justify-center">
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger className="w-full max-w-[100px]">
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
            <Input
              type="number"
              value={value}
              className="w-full max-w-[200px]"
              onChange={handleAmountChange}
            />
          </div>
          <Button
            variant="outline"
            className="group cursor-pointer hover:bg-blue-200"
            onClick={handleReverseCurrencies}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 group-hover:stroke-white transition-colors duration-200 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </Button>
          <div className="flex gap-4 w-full justify-center">
            <Select value={targetCurrency} onValueChange={setTargetCurrency}>
              <SelectTrigger className="w-full max-w-[100px]">
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
            <Input
              type="number"
              value={targetAmount}
              className="w-full max-w-[200px]"
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Culculate;
