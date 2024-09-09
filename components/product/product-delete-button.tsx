"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import DeleteProductModal from "./delete-product-modal";

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

  const handleProductDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleProductDelete}
        disabled={pending}
        className={`bg-${color} px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md 
        text-white font-semibold disabled:bg-neutral-400 disabled:text-neutral-300
    disabled:cursor-not-allowed`}
      >
        {pending ? "로딩중..." : text}
      </button>
      {isModalOpen ? (
        <DeleteProductModal
          setIsModalOpen={setIsModalOpen}
          productId={productId}
        />
      ) : (
        ""
      )}
    </>
  );
}
