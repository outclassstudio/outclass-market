import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";

export default async function ProductModalLoading() {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60 z-50
    flex justify-center items-center animate-pulse"
    >
      <div className="flex flex-col items-center justify-center shadow-2xl">
        <div
          className="bg-neutral-800 max-w-screen-sm w-full
      flex gap-5 justify-center rounded-tr-md mx-5"
        >
          <div
            className="aspect-ratio border-4 size-[340px] bg-neutral-700 text-neutral-200 
          flex justify-center items-center"
          >
            <PhotoIcon className="h-28" />
          </div>
          <div className="flex flex-col gap-3 w-[280px] py-3 pr-3">
            <div className="pb-4 flex justify-start items-center gap-3 border-b border-neutral-600">
              <div className="size-10 overflow-hidden rounded-full">
                <UserIcon />
              </div>
              <div className="w-10 h-4 rounded-md bg-neutral-700" />
            </div>
            <div>
              <div className="w-10 h-4 rounded-md bg-neutral-700 mb-2" />
              <div className="w-6 h-2 rounded-md bg-neutral-400" />
            </div>
            <div className="w-40 h-4 rounded-md bg-neutral-500" />
          </div>
        </div>
        <div
          className="p-5 bg-neutral-700 rounded-br-md
      flex justify-between items-center w-[640px] mx-5"
        >
          <span className="w-20 h-5 rounded-full bg-neutral-400" />
          <div className="flex gap-3.5">
            <div
              className="bg-neutral-500 px-5 py-2.5 rounded-md 
        text-white font-semibold"
            >
              로딩중
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
