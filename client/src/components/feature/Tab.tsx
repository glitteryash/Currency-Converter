import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Culculate from "./Culculate";
import History from "./History";

function Tab() {
  const [baseCurrency, setBaseCurrency] = useState("JPY");
  const [targetCurrency, setTargetCurrency] = useState("USD");

  return (
    <div className="flex justify-center items-center h-screen mx-4">
      <Card className="w-full max-w-lg">
        <Tabs className="w-full flex px-6" defaultValue="culculate">
          <TabsList className="mb-2 w-full">
            <TabsTrigger className="cursor-pointer" value="culculate">
              通貨換算
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="history">
              歴史チャート
            </TabsTrigger>
          </TabsList>
          <TabsContent value="culculate">
            <Culculate
              baseCurrency={baseCurrency}
              setBaseCurrency={setBaseCurrency}
              targetCurrency={targetCurrency}
              setTargetCurrency={setTargetCurrency}
            />
          </TabsContent>
          <TabsContent value="history">
            <History
              baseCurrency={baseCurrency}
              targetCurrency={targetCurrency}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Tab;
