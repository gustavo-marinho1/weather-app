import { useNavigate } from "react-router";
import { SearchNav } from "../components/SearchNav";
import { useEffect, useState } from "react";
import axios from "axios";
import type { city } from "../lib/city";
import { apiKey } from "../lib/api";
import { SearchResults } from "../components/SearchResults";
import { City } from "../components/City";
import { ApiErrorBox, CityNotFoundBox, LoadingBox } from "../components/Boxes";

export const Search = () => {

  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [errorApi, setErrorApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<city[]>([]);

  const [coordsInParams, setCoordsInParams] = useState<boolean>(false);
  const [displayCity, setDisplayCity] = useState<boolean>(false);
  const [lat, setLat] = useState<number | string>(0);
  const [lon, setLon] = useState<number | string>(0);

  useEffect(() => {
    const search = params.get("s");
    if (search) {
      getCoordenates(search);
    }
    else {
      const latParam = params.get("lat");
      const lonParam = params.get("lon");
      if (latParam && lonParam) {
        setLat(latParam);
        setLon(lonParam);
        setDisplayCity(true);
        setCoordsInParams(true);
      }
      else {
        navigate("/");
      }
    }
  }, []);

  const handleSearch = (search: string) => {
    if (search.length > 0) {
      navigate(`/search?s=${search}`);
      getCoordenates(search);
    }
  }

  const getCoordenates = async (search: string) => {
    setLoading(true);
    setDisplayCity(false);
    setErrorApi(false);
    setResults([]);
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=${apiKey}`);
      if (Array.isArray(response.data)) {
        setResults(response.data);
      }
      else {
        setResults([]);
      }
    }
    catch {
      setErrorApi(true);
      setResults([]);
    }
    setLoading(false);
  }

  const handleClickCity = (latParam: number, lonParam: number) => {
    setDisplayCity(true);
    setLat(latParam);
    setLon(lonParam);
  }

  const closeCity = () => {
    if (coordsInParams) {
      navigate("/");
    }
    else {
      setDisplayCity(false);
    }
  }

  return (
    <div className="h-full">

      {displayCity ? (
        <City
          lat={lat}
          lon={lon}
          closeCity={closeCity}
        />
      ) : (
        <>
          {errorApi ? (
            <ApiErrorBox />
          ) : (
            <div className="flex flex-col gap-6">

              <SearchNav handleSearch={handleSearch} />

              {loading ? (
                <LoadingBox />
              ) : (
                <>
                  {(results.length > 0) ? (
                    <SearchResults
                      results={results}
                      handleClickCity={handleClickCity}
                    />
                  ) : (
                    <CityNotFoundBox />
                  )}
                </>
              )}

            </div>
          )}
        </>
      )}

    </div>
  )
}