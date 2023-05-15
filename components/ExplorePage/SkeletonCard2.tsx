export default function SkeletonCard2({hidden}){
    return (
      <div className={`${hidden && "hidden lg:flex"} flex relative flex-col  h-[18rem] md:h-[13rem] xl:h-[16rem]  transition-all bg-[#282828] p-4 rounded-lg text-center overflow-hidden w-full gap-4`}>
        <div className="h-6 w-full bg-[#363636] rounded-lg"></div>
        <div className="h-full w-full rounded-lg bg-[#363636] animate-pulse overflow-hidden">
       </div> 
     </div>
    );
  };