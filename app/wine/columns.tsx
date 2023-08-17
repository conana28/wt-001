"use client";

import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { WineData } from "./data-table";
// import Delete from "./delete";
import { EditWineModal } from "@/app/wine/modal-edit-wine";
import { AddWineModal } from "@/app/wine/modal-add-wine";
import { DeleteWineModal } from "@/app/wine/modal-delete-wine";
// import ShowBottleDialog from "./showBottlesDialog";
// import Test from "./test";
import { Badge } from "@/components/ui/badge";
import { FormModal } from "@/components/modals/form-modal";
import { ShowBottlesModal } from "@/components/modals/show-bottles-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WineData>[] = [
  {
    accessorKey: "Bottle",
    header: () => <div className="text-center">Btls</div>,
    cell: function Cell(props) {
      const [showBottle, setShowBottle] = useState(true);
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const toggleBottle = () => {
        // setShowBottle(!showBottle);
        setOpen(!open);
      };

      const onContinue = () => {
        console.log("first");
        setOpen(false);
      };

      return (
        <div style={{ textAlign: "center" }}>
          {props.row.original.bottle.length > 0 && (
            <Badge onClick={toggleBottle}>
              {props.row.original.bottle.length}
            </Badge>
          )}
          {/* <button onClick={toggleBottle}>Show Bottle</button> */}
          {showBottle && (
            // props.row.original.Bottle.map((bottle, index) => (
            // <div key={index}>
            //   {bottle && bottle.rack ? bottle.rack : "N/A"}/
            //   {bottle && bottle.shelf ? bottle.shelf : "N/A"}
            // </div>

            // ))
            // <Dialog open={showBottle}>
            //   <ShowBottleDialog setShowBottle={setShowBottle} />
            // </Dialog>

            <ShowBottlesModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={onContinue}
              loading={loading}
              title={
                props.row.original.producer + " " + props.row.original.wineName
              }
              bottles={props.row.original.bottle}
            />
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "producer",
  //   header: "Producer",
  // },
  // {
  //   accessorKey: "wineName",
  //   header: "Wine Name",
  // },
  {
    id: "name",
    header: "Wine",
    accessorFn: (row) => `${row.producer} ${row.wineName}`,
  },
  { accessorKey: "id", header: "Id" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "subRegion", header: "Sub Region" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const t = row.original.type;
      if (!t) return <div style={{ textAlign: "center" }}>n/a</div>;
      return (
        <>
          <div className="flex justify-center">
            {t === "R" && (
              <Circle className="text-red-900 h-4 w-4" fill="currentColor" />
            )}
            {t === "W" && (
              <Circle className="text-yellow-100 h-4 w-4" fill="currentColor" />
            )}
            {t === "RO" && (
              <Circle className="text-rose-500 h-4 w-4" fill="currentColor" />
            )}
            {t === "SW" && (
              <Circle className="text-yellow-300 h-4 w-4" fill="currentColor" />
            )}
            {t === "FW" && (
              <Circle className="text-amber-800 h-4 w-4" fill="currentColor" />
            )}
            {t === "FR" && (
              <Circle className="text-purple-900 h-4 w-4" fill="currentColor" />
            )}
            {t === "RS" && (
              <Circle
                className="text-red-500 h-4 w-4"
                fill="url(#pattern-red)"
              />
            )}
            {t === "WS" && (
              <Circle
                className="text-slate-400 h-4 w-4"
                fill="url(#pattern-white)"
              />
            )}
            <svg width="0" height="0">
              <defs>
                <pattern
                  id="pattern-red"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                >
                  <rect fill="#fff" x="0" y="0" width="4" height="4" />
                  <rect fill="#f00" x="0" y="0" width="2" height="2" />
                  <rect fill="#f00" x="2" y="2" width="2" height="2" />
                </pattern>
                <pattern
                  id="pattern-white"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                >
                  <rect fill="#fff" x="0" y="0" width="4" height="4" />
                  <rect fill="#000" x="0" y="0" width="2" height="2" />
                  <rect fill="#000" x="2" y="2" width="2" height="2" />
                </pattern>
              </defs>
            </svg>
          </div>
        </>
      );
    },
  },

  // {
  //   accessorKey: "type",
  //   header: () => <div className="text-center">Type</div>,
  //   cell: (props) => {
  //     const router = useRouter();
  //     const goToBottles = () => {
  //       router.push(`/bottle/${props.row.original.id}`);
  //     };

  //     return (
  //       <div style={{ textAlign: "center" }}>
  //         {props.row.original.bottle.length > 0 && (
  //           <Badge onClick={goToBottles}>
  //             {props.row.original.bottle.length}
  //           </Badge>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "Botttle",
  //   header: () => <div className="text-center">Btls</div>,
  //   cell: (props) => (
  //     <div
  //       style={{ textAlign: "center" }}
  //     >{`${props.row.original.Bottle.length}`}</div>
  //   ),
  // },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    // cell: ({ row }) => {
    cell: function Cell({ row }) {
      // console.log("Id: ", row);
      // const wine = row.original;
      const [open, setOpen] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openAddModal, setOpenAddModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="float-right mr-2 h-8 w-8 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setOpenEditModal(true)}>
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setOpenAddModal(true)}>
                  Add
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              {/* <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setWhichDialog("view")}>
                  View wine details
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  onClick={() => setWhichDialog("")}
                >
                  Clip
                </DropdownMenuItem>
              </DialogTrigger> */}
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>

          {open && openEditModal && (
            <EditWineModal
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              wine={row.original}
            />
          )}

          {open && openAddModal && (
            <AddWineModal
              isOpen={openAddModal}
              onClose={() => setOpenAddModal(false)}
              wine={row.original}
            />
          )}

          {open && openDeleteModal && (
            <DeleteWineModal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              wine={row.original}
            />
          )}
        </Dialog>
      );
    },
  },
];
