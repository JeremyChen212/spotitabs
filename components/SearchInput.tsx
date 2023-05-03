import { useRouter } from "next/router";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useSpotify } from "../context/SpotifyContext";

export default function SearchInput() {
  const router = useRouter();
  const { query, setQuery } = useSpotify();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${query}`);
}

  return (
    <form 
      className="container flex items-center max-sm:w-fit px-3 py-2  w-full max-w-[50rem] gap-3 bg-[#1d4e447b] rounded-full m-auto "
      onSubmit={handleSubmit}
    >
      <IoSearchOutline className="text-2xl text-[#ffffff6e]" />
      <input 
       type="text"
        className="max-sm:hidden flex-grow w-full text-sm font-semibold bg-transparent text-white focus:outline-none"
        placeholder="Artists and songs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
      />
      {query && (
        <button 
          type="button"
          className="flex items-center focus:outline-none"
          onClick={() => setQuery("")}
          >
          <IoCloseOutline className="text-2xl text-[#ffffff6e]" />
        </button>
      )}
    </form>
  )
  
}