"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { toast } from "../ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface ConsumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  // loading: boolean;
  title: string;
  bId: number;
}

export const ConsumeBottleModal: React.FC<ConsumeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  bId,
  // loading,
}) => {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) return null;

  const consumeFormSchema = z.object({
    occassion: z.string(),
    consume: z.date({
      required_error: "Consume is required.",
    }),
  });

  type ConsumeFormValues = z.infer<typeof consumeFormSchema>;

  const defaultValues: Partial<ConsumeFormValues> = {
    occassion: "",
    // dob: new Date("2023-01-23"),
    consume: new Date(),
  };

  const form = useForm<ConsumeFormValues>({
    resolver: zodResolver(consumeFormSchema),
    defaultValues,
  });

  function onSubmit(data: ConsumeFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Modal
        title={title}
        description={`Id = ${bId}`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="consume"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Consume</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occassion"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Ocassion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 flex items-center justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={onConfirm}>
                    Continue
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
