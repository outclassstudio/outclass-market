export default function Home() {
  return (
    <main
      className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700
    sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100"
    >
      <div
        className="bg-white shadow-lg p-5 w-full max-w-screen-sm rounded-3xl dark:bg-gray-500
      flex flex-col md:flex-row gap-2"
      >
        <input
          className="w-full rounded-full h-12 bg-gray-200 pl-5 outline-none
          ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow
          placeholder:drop-shadow invalid:focus:ring-red-500 peer"
          type="email"
          required
          placeholder="Email address"
        />
        <span className="text-red-400 font-medium hidden peer-invalid:block">
          Email is required
        </span>
        <button
          className="text-white py-2 rounded-full active:scale-90 outline-none transition-transform 
          font-medium md:px-10 bg-black peer-invalid:bg-orange-500"
        >
          Login
        </button>
      </div>
    </main>
  );
}
