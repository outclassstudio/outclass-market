export default function ProfileEditLoading() {
  return (
    <div className="animate-pulse *:rounded-md">
      <div className="flex justify-between items-center px-3 py-4 border-b border-neutral-700">
        <div className="flex gap-3 *:rounded-md *:bg-neutral-700">
          <span className=" w-5 h-7"></span>
          <span className="w-[85px] h-7"></span>
        </div>
        <span className="bg-neutral-700 w-9 h-7 rounded-md"></span>
      </div>
      <div className="flex flex-col items-center w-full px-3 pt-6 pb-4 ">
        <div className="w-24 h-24 rounded-full m-2 mb-6 overflow-hidden bg-neutral-700" />
        <div className="mb-6 w-16 h-5 rounded-md bg-neutral-700" />
        <div className="w-full flex flex-col gap-2 *:rounded-md *:bg-neutral-700">
          <div className="w-10 h-5" />
          <div className="w-full h-10" />
        </div>
      </div>
    </div>
  );
}
