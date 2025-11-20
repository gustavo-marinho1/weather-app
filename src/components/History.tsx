import type { HistoryItem } from "../lib/historySlice";
import { useNavigate } from "react-router";

export const History = ({history}: {history: HistoryItem[]}) => {

  const navigate = useNavigate();

  const handleClickItem = (lat: number, lon: number) => {
    navigate(`/search?lat=${lat}&lon=${lon}`);
  }

  return (
    <>
      {(history && history.length > 0) && (
        <div className="w-full h-full flex flex-col gap-2">

          <div className="text-gray-200">History</div>

          {[...history].reverse().map((h, index) => (
            <div
              key={index}
              className={`
                w-full flex flex-col items-start gap-0 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.15)]
                transition duration-100 text-white rounded-md cursor-pointer py-2
              `}
              onClick={() => handleClickItem(h.lat, h.lon)}
            >
              <div className="px-3 text-lg font-semibold">
                {h.name}
              </div>

              <div className="px-3 text-gray-200 font-light">
                {h.country}
              </div>
            </div>
          ))}

        </div>
      )}
    </>
  )
}