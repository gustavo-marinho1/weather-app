import { useNavigate } from "react-router";
import { SearchNav } from "../components/SearchNav";
import { History } from "../components/History";

export const Home = () => {

  const navigate = useNavigate();

  const handleSearch = (search: string) => {
    if (search.length > 0) {
      navigate(`/search?s=${search}`);
    }
  }

  return (
    <div className="h-full flex flex-col gap-6">

      <SearchNav handleSearch={handleSearch} />

      <div className="h-full">
        <History />
      </div>

    </div>
  )
}