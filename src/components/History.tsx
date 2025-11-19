import { useSelector } from "react-redux";
import type { HistoryItem } from "../lib/historySlice";
import { useNavigate } from "react-router";

export const History = () => {

  const navigate = useNavigate();

  // @ts-ignore
  const history: HistoryItem[] = useSelector((state) => state.history.history);

  const handleClickItem = (lat: number, lon: number) => {
    navigate(`/search?lat=${lat}&lon=${lon}`);
  }

  return (
    <>
      {(history.length > 0) && (
        <div className="w-full h-full flex flex-col gap-2">

          <div className="text-gray-200">History</div>

          {history.map((h, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-start gap-0 bg-[rgba(0,0,0,0.1)] text-white rounded-md cursor-pointer py-2"
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