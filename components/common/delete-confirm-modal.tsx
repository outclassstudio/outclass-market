interface DeleteProductModalProps {
  handleModalClose: () => void;
  handleDelete: () => void;
}

export default function DeleteConfirmModal({
  handleModalClose,
  handleDelete,
}: DeleteProductModalProps) {
  return (
    <div
      className="fixed h-screen w-full top-0 left-0 flex flex-col z-10
      justify-center items-center"
    >
      <div
        className="bg-white px-14 sm:px-16 py-6 sm:py-8 z20 shadow-lg rounded-md
      flex flex-col gap-3 "
      >
        <div className="text-neutral-900 font-bold text-lg">
          정말 삭제하시겠어요?
        </div>
        <div
          className="flex gap-3 *:rounded-md justify-center *:cursor-pointer 
        *:text-white *:px-4 *:py-2"
        >
          <span onClick={handleDelete} className="bg-red-500">
            확인
          </span>
          <span onClick={handleModalClose} className="bg-neutral-800">
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
