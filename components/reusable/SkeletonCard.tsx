export default function SkeletonCard(){
    return (
      <div className="flex transition-all grid-cols-3 bg-[#282828] p-4 rounded-lg h-[9rem] overflow-hidden min-w-[20rem] w-full gap-4">
       <div className="h-[7rem] w-[7rem] rounded-lg bg-[#363636] animate-pulse overflow-hidden">
       </div> 
       <div className="w-full h-100 flex-1 flex flex-col animate-pulse max-w-10 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-full bg-[#363636] rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-[#363636] rounded-full"></div>
          <div className="h-3 w-[50%] bg-[#363636] rounded-full"></div>
          <div className="h-3 w-[80%] bg-[#363636] rounded-full"></div>
        </div>
       </div>
     </div>
    );
  };