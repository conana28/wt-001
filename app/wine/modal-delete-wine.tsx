"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context/store";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  wine: any;
}

export const DeleteWineModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  wine,
}) => {
  console.log("Delete wine: ", wine);

  const { userId, setUserId } = useGlobalContext();

  const deleteHandler = async () => {
    console.log("Delete..", wine.bottle.length);
    // if ((wine.bottle.length = 0)) {
    const response = await fetch(`api/wine/${wine.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(null),
    });
    const data = await response.json();
    console.log("response", data.message);
    // }
    toast({
      variant: "success",
      description: data.message,
    });
    setUserId(!userId);
    onClose();
  };

  return (
    <>
      <Modal
        title={`Delete ${wine.producer} ${wine.wineName} (${wine.id})`}
        description={
          wine.bottle.length > 0
            ? "Can't delete a wine with existing bottles"
            : "Are you sure? This cannot be undone"
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-row justify-end">
          {wine.bottle.length > 0 && (
            <Button onClick={onClose} size="xs">
              Cancel
            </Button>
          )}
          {wine.bottle.length === 0 && (
            <Button onClick={deleteHandler} size="xs">
              Delete
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};
