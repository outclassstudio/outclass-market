export default function LifeLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse p-5 mb-5">
      {[...Array(7)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5">
          <div className="flex flex-col gap-3 *:rounded-md">
            <div className="bg-neutral-700 h-7 w-20" />
            <div className="bg-neutral-700 h-6 w-40" />
            <div className="flex gap-2 *:rounded-md">
              <div className="bg-neutral-700 h-5 w-5" />
              <div className="bg-neutral-700 h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
