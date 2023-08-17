"use client";

import { useState } from "react";
// import { Decimal } from "@prisma/client/runtime/library";

// import CellarDisplay from "@/app/cellar/cellar-display";
// import CellarSearchForm from "@/app/cellar/cellar-search-form";
import { useGlobalContext } from "@/context/store";
// import CellarDisplayMobile from "./cellar-display-mobile";
import WineSearchForm from "./wine-search-form";
import { Bottle } from "@prisma/client";
// import WineDisplay from "./wine-display";
import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import ShowDataTable from "./data-table";

export type WineData = {
  id: number;
  producer: string;
  wineName: string;
  country: string;
  region: string;
  type: string;
  bottle: Array<Bottle | "">;
};
export type WineType = {
  id: number;
  value: string;
  label: string;
};

const Wine = () => {
  const { showWines, setShowWines } = useGlobalContext(); // Controls whether CellarDisplay is shown.
  const [wines, setWines] = useState<WineData[]>([]); // The array of bottles to be displayed.
  const [wineTypes, setWineTypes] = useState<WineType[]>([]);
  const [search, setSearch] = useState<string>(""); // Search string.
  const [pageCount, setPageCount] = useState(0);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { userId } = useGlobalContext(); // togle to force refresh of data

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile View */}
      <div className="sm:hidden">
        {/* show the cellar search form and return the search string to setSearch */}
        <WineSearchForm setSearch={setSearch} />
        {/* show the cellar display if showBtls (useContext) is true */}
        {/* {showBtls && <CellarDisplayMobile btls={btls1} />} */}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex flex-1">
        <div className="w-1/4">
          {/* get search params, and UseEffect will get the data */}
          <WineSearchForm setSearch={setSearch} />
        </div>

        <div className="w-3/4">
          {/* show the win display if showWines (useContext) is true */}
          {showWines && (
            <Card className="mt-2 mr-2 ml-2 sm:ml-0">
              {/* <ScrollArea className="h-[300px] xl:h-[500px]"> */}
              <ShowDataTable search={search} />
              {/* </ScrollArea> */}
              <Button size="xs" onClick={() => setShowWines(false)}>
                Hide
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wine;
