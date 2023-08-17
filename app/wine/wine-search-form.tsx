"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bottle } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Search, SearchX } from "lucide-react";
// import { useBtlsContext } from "@/context/BtlsContext";
import { useGlobalContext } from "@/context/store";

const wineSearchFormSchema = z.object({
  wineSearch: z.string().min(1),
});

type WineSearchFormValues = z.infer<typeof wineSearchFormSchema>;

const defaultValues: Partial<WineSearchFormValues> = {
  wineSearch: "",
};

interface WineSearchFormProps {
  // setShowBtls: React.Dispatch<React.SetStateAction<boolean>>;
  // setSearch: React.Dispatch<React.SetStateAction<Bottle1[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const WineSearchForm = ({ setSearch }: WineSearchFormProps) => {
  const { showWines, setShowWines } = useGlobalContext();

  const form = useForm<z.infer<typeof wineSearchFormSchema>>({
    resolver: zodResolver(wineSearchFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof wineSearchFormSchema>) => {
    console.log(data);
    setSearch(data.wineSearch);
    setShowWines(true); // update the global context.
  };

  return (
    <>
      <Card className={`${showWines ? "opacity-80" : ""} mt-2 mx-2`}>
        <CardHeader>
          <CardTitle>
            <div>
              <span>Wine Search </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="space-y-4">
                  {/* <div className="flex flex-row sm:flex-col gap-2"> */}
                  <FormField
                    control={form.control}
                    name="wineSearch"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Name</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Wine name"
                            disabled={showWines}
                            autoFocus
                            type="search"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* </div> */}
              </div>

              <div className="mx-auto flex flex-row items-center justify-around">
                <Button
                  size="xs"
                  type="submit"
                  variant="ghost"
                  disabled={showWines}
                >
                  <Search className="" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default WineSearchForm;
