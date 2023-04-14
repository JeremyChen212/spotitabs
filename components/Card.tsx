import Link from "next/link"


export default function Card({playlist}) {
    return (
        <Link className="relative rounded-md bg-[#010504] cursor-pointer h-[100%] hover:scale-90 transition-all" href={`/playlist/${playlist.id}`} >
        <div className={'relative h-fit rounded-md flex-column p-5 h-[100%]'} id={playlist.id}  >
            <img src={playlist?.images?.[0]?.url} />
            <h1 className="font-medium w-[100%] whitespace-nowrap overflow-hidden text-ellipsis mt-5 text-semibold text-xl text-[#e3fff9]" >{playlist.name}</h1>
        </div>
        </Link>
    )
}