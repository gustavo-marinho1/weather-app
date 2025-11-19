import { Search } from "lucide-react";
import { useState } from "react";

export const SearchNav = ({ handleSearch }: { handleSearch: (s: string) => void }) => {

  const [value, setValue] = useState<string>("");

  const handleClick = () => {
    handleSearch(value);
  }

  return (
    <form className="w-full flex flex-row items-end gap-1" onSubmit={e => { e.preventDefault(); handleClick(); }}>

      <div className="w-full flex flex-col gap-1 items-start">
        <label htmlFor="search-input" className="text-left text-nowrap text-sm font-medium text-white">
          Search city
        </label>
        <input
          className={`
            flex w-full h-[48px] rounded-md border border-[rgba(255,255,255,0.3)] px-3 py-2 text-white
            bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.2)]
            focus-visible:outline-none focus-visible:ring-0
          `}
          id="search-input"
          placeholder="City..."
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="size-[48px] text-white text-sm flex justify-center items-center"
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.3)",
          padding: 0,
        }}
        onClick={handleClick}
      >
        <Search className="size-5" />
      </button>

    </form>
  )
}