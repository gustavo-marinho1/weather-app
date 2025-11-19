import type { city } from "../lib/city"

export const SearchResults = ({results, handleClickCity}: {
  results: city[],
  handleClickCity: (lat: number, lon: number) => void
}) => {
  return (
    <div className="w-full flex flex-col gap-2">

      <div className="text-gray-200">Results</div>

      {results.map((r, index) => {
        return (
          <div
            key={index}
            className="w-full flex flex-col items-start gap-0 bg-[rgba(255,255,255,0.1)] text-white rounded-md cursor-pointer py-2"
            onClick={() => handleClickCity(r.lat, r.lon)}
          >

            <div className="px-3 text-lg font-semibold">
              {r.name}
            </div>

            <div className="px-3 text-gray-200 font-light">
              {r.state}, {r.country}
            </div>

          </div>
        )
      })}

    </div>
  )
}