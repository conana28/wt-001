"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/store";
import { WineType } from "./page";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  wine: any;
}

export const EditWineModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  wine,
}) => {
  // console.log("Edit", wine);

  const editFormSchema = z.object({
    id: z.number(),
    producer: z.string().min(2),
    wineName: z.string(),
    country: z.string().min(2),
    region: z.string().min(2),
    subRegion: z.string().optional(),
    type: z.string().min(1).optional(),
  });

  type EditFormValues = z.infer<typeof editFormSchema>;

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      id: wine.id,
      producer: wine.producer,
      wineName: wine.wineName,
      country: wine.country,
      region: wine.region,
      subRegion: wine.subRegion,
      type: wine.type,
    },
  });

  const cancelHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Cancel ..");
    event.preventDefault();
    onClose(); // function to close dialog
  };

  const { userId, setUserId } = useGlobalContext();
  const [wineTypes, setWineTypes] = useState<WineType[]>([]);

  async function onSubmit(data: EditFormValues) {
    // console.log("Edit Submit ", data);
    try {
      // console.log("Submit", data);
      const response = await fetch("api/wine", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-cache",
      });
      // console.log("response", response);

      toast({
        description: `Bottle ${data.id} Updated.`,
      });
    } catch (error) {
      console.error(error);
    }

    setUserId(!userId);
    onClose();
  }

  useEffect(() => {
    const fetchTypes = async () => {
      // console.log("UseEffect types: ");
      const response = await fetch(`/api/utils/type`);
      const data = await response.json();
      // console.log(data);
      setWineTypes(data);
    };

    fetchTypes();
  }, []);

  return (
    <>
      <Modal
        title="Edit Wine"
        description={`${wine.producer} ${wine.wineName} (${wine.id})`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="producer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producer</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wine name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row w-full gap-4">
                  <div className="flex-1 ">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 ">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-4">
                  <div className="flex-1 ">
                    <FormField
                      control={form.control}
                      name="subRegion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Region</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 ">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          {/* <FormControl>
                            <Input {...field} />
                          </FormControl> */}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {wineTypes.map((type) => (
                                <SelectItem key={type.id} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="pt-6 flex items-center justify-end space-x-2">
                  <Button variant="outline" size="xs" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button type="submit" size="xs">
                    Edit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
