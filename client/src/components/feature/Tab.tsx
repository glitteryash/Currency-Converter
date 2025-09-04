import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Culculate from "./culculate";
import History from "./history";

function Tab() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
        <Tabs className="w-full flex px-6" defaultValue="culculate">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="culculate">通貨換算</TabsTrigger>
            <TabsTrigger value="history">歴史チャート</TabsTrigger>
          </TabsList>
          <TabsContent value="culculate">
            <Culculate />
          </TabsContent>
          <TabsContent value="history">
            <History />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Tab;
