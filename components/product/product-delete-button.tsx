"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import DeleteConfirmModal from "../common/delete-confirm-modal";
import { deleteProduct } from "@/app/(products)/edit/product/[id]/action";
import { useRouter } from "next/navigation";

interface ButtonProps {
  text: string;
  color: string;
  productId: number;
}

export default function ProductDeleteButton({
  text,
  color,
  productId,
}: ButtonProps) {
  const { pending } = useFormStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleProductDelete = async () => {
    const result = await deleteProduct(productId);
    if (result) {
      router.push("/home");
    }
  };

  return (
    <>
      <button
        onClick={handleModalOpen}
        disabled={pending}
        className={`bg-${color} px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold disabled:bg-neutral-400 disabled:text-neutral-300
    disabled:cursor-not-allowed`}
      >
        {pending ? "로딩중..." : text}
      </button>
      {isModalOpen ? (
        <DeleteConfirmModal
          handleModalClose={handleModalOpen}
          handleDelete={handleProductDelete}
        />
      ) : (
        ""
      )}
    </>
  );
}
