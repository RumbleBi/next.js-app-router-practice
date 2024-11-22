export default function BookItemSkeleton() {
  return (
    <div className="primary-main flex gap-[15px] border-b px-[10px] py-[20px]">
      <div className="h-[105px] w-20 bg-slate-400"></div>
      <div className="flex-1">
        <div className="h-5 w-full bg-primary-main"></div>
        <div className="h-5 w-full bg-primary-main"></div>
        <br />
        <div className="h-5 w-full bg-primary-main"></div>
      </div>
    </div>
  );
}
