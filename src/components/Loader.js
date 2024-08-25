export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full min-h-40">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-t-transparent"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          {/* <div className="animate-pulse rounded-full h-10 w-10 bg-blue-500"></div> */}
        </div>
      </div>
    </div>
  );
}
