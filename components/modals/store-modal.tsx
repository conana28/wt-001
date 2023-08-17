"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Children
    </Modal>
  );
};
