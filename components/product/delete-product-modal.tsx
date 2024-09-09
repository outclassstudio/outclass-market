import { deleteProduct } from "@/app/(products)/edit/product/[id]/action";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface DeleteProductModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  productId: number;
}

export default function DeleteProductModal({
  setIsModalOpen,
  productId,
}: DeleteProductModalProps) {
  const router = useRouter();
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProductDelete = async () => {
    if (!productId) return;
    await deleteProduct(productId);
    router.push("/home");
  };

  return (
    <div
      className="fixed h-screen w-full top-0 left-0 flex flex-col z-10
      justify-center items-center"
    >
      <div
        className="bg-white px-14 py-8 z20 shadow-lg rounded-md
      flex flex-col gap-3 "
      >
        <div className="text-neutral-900 font-bold text-lg">
          정말 삭제하시겠어요?
        </div>
        <div className="flex gap-2 *:rounded-md justify-center *:cursor-pointer">
          <span onClick={handleProductDelete} className="px-3 py-2 bg-red-500">
            확인
          </span>
          <span onClick={handleModalClose} className="px-3 py-2 bg-neutral-800">
            취소
          </span>
        </div>
      </div>
      <div
        className="fixed h-screen w-full top-0 left-0 bg-neutral-800 opacity-30 -z-10"
        onClick={handleModalClose}
      />
    </div>
  );
}
