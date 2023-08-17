"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // To avoid possible hydration errors as modal is a client-only component
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
