import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGlobalContext } from "@/context/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { WineData, WineType } from "./page";
import { columns } from "./columns";

interface WineDisplayProps {
  wines: WineData[];
  wTypes: WineType[];
}

const WineDisplay = ({ wines, wTypes }: WineDisplayProps) => {
  console.log(wines);
  const { setShowWines } = useGlobalContext();

  return (
    <Card className="mt-2 mr-2 ml-2 sm:ml-0">
      <ScrollArea className="h-[300px] xl:h-[500px]">
        <DataTable columns={columns} data={wines} />
      </ScrollArea>

      <Button onClick={() => setShowWines(false)}>Hide</Button>
    </Card>
  );
};

export default WineDisplay;
