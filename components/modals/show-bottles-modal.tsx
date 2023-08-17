"use client";

import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { StoreModal } from "./store-modal";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "../ui/separator";
import { Bottle } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BottlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  bottles: any;
}

export const ShowBottlesModal: React.FC<BottlesModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  bottles,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const tags = Array.from({ length: 20 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <>
      <Modal title={title} description="" isOpen={isOpen} onClose={onClose}>
        {/* <div>
          <p>{bottles[0].rack}</p>
        </div> */}
        <div className="flex justify-center ">
          <div
            className={`  w-80 pt-2 px-2 rounded-md border ${
              bottles.length > 1 ? " h-40 overflow-y-scroll" : "h-20"
            }`}
          >
            {/* {tags.map((tag) => (
              <>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </>
            ))} */}

            {/* {bottles.map((bottle: Bottle) => (
              <>
                <div key={bottle.id} className="text-sm">
                  {bottle.rack} [{bottle.shelf}] ${bottle.cost?.toString()}
                </div>

                <Separator className="my-2" />
              </>
            ))} */}

            {bottles.map((bottle: Bottle) => (
              <div key={bottle.id} className="text-sm">
                <div>
                  {bottle.rack} [{bottle.shelf}] ${bottle.cost?.toString()}
                  <Separator key={`separator-${bottle.id}`} className="my-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
            size="xs"
          >
            Return
          </Button>
        </div>
      </Modal>
    </>
  );
};
