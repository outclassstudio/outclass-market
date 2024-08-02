export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
      <div className="bg-white shadow-lg p-5 w-full max-w-screen-sm rounded-3xl dark:bg-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">
              In transit
            </span>
            <span className="text-4xl font-bold dark:text-white">Coolblue</span>
          </div>
          <div className="size-12 rounded-full bg-orange-500"></div>
        </div>
        <div className="flex items-center my-2 gap-2">
          <span
            className="bg-green-400 rounded-3xl px-5 py-2 text-xl text-white font-semibold
             transition hover:bg-green-500 hover:cursor-pointer hover:scale-125"
          >
            TODAY
          </span>
          <span className="text-2xl font-semibold dark:text-gray-100">
            9:30-10:30u
          </span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-full absolute"></div>
          <div className="bg-green-500 w-2/3 h-2 rounded-full absolute"></div>
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-600 text-xl dark:text-gray-100">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        </div>
      </div>
    </main>
  );
}
