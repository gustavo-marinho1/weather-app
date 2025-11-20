import { useNavigate } from "react-router";
import { SearchNav } from "../components/SearchNav";
import { History } from "../components/History";
import type { HistoryItem } from "../lib/historySlice";
import { useSelector } from "react-redux";

export const Home = () => {

  const navigate = useNavigate();

  // @ts-ignore
  const history: HistoryItem[] = useSelector((state) => state.history.history);

  const handleSearch = (search: string) => {
    if (search.length > 0) {
      navigate(`/search?s=${search}`);
    }
  }

  return (
    <div className="h-full flex flex-col gap-6">

      <SearchNav handleSearch={handleSearch} />

      <div className="h-full">
        {history.length > 0 ? (
          <History history={history} />
        ) : (
          <div className="h-full flex justify-center items-center text-white">
            <span className="text-xl font-semibold">Check the weather in any city</span>
          </div>
        )}
        
      </div>

    </div>
  )
}