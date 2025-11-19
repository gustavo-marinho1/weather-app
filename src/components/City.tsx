import axios from "axios";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { apiKey } from "../lib/api";
import type { weatherType, weatherData } from "../lib/weather";
import { useDispatch } from "react-redux";
import { addToHistory } from "../lib/historySlice";

export const City = ({lat, lon, closeCity}: {
  lat: number | string,
  lon: number | string,
  closeCity: () => void
}) => {

  const dispatch = useDispatch();

  const [data, setData] = useState<weatherData>();
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [temp, setTemp] = useState<string>("");
  const [tempMin, setTempMin] = useState<string>("");
  const [tempMax, setTempMax] = useState<string>("");
  const [feelsLike, setFeelsLike] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [pressure, setPressure] = useState<string>("");
  const [weather, setWeather] = useState<weatherType>();

  useEffect(() => {
    if (lat && lon) {
      getWeather();
    }
    else {
      // reset all states
    }
  }, [lat, lon]);

  useEffect(() => {
    if (data) {
      dispatch(addToHistory({
        name: city,
        country: country,
        lat: data.coord.lat,
        lon: data.coord.lon
      }));
    }
  }, [data]);

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const data: weatherData = response.data;
      setData(response.data);
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp((Math.round((data.main.temp * 100) / 100) - (273)).toFixed(0));
      setTempMin((Math.round((data.main.temp_min * 100) / 100) - (273)).toFixed(0));
      setTempMax((Math.round((data.main.temp_max * 100) / 100) - (273)).toFixed(0));
      setFeelsLike((Math.round((data.main.feels_like * 100) / 100) - (273)).toFixed(0));
      setVisibility(`${data.visibility / 1000} km`);
      setWindSpeed(`${(data.wind.speed * 3.6).toFixed(0)} km/h`);
      setHumidity(`${data.main.humidity}%`);
      setPressure(`${data.main.pressure}mb`);
      if (data.weather.length > 0) setWeather(data.weather[0]);
    }
    catch {
      closeCity();
      setData(undefined);
    }
  }

  return (
    <div className="h-full flex flex-col gap-3 text-nowrap">

      <div className="flex items-center gap-2 bg-[rgba(0,0,0,0.2)] p-2 pr-3 rounded-md w-fit text-white cursor-pointer" onClick={closeCity}>
        <ArrowLeft className="size-5" />
        <div className="text-sm">Back</div>
      </div>

      {data && (
        <div className="w-full flex flex-col items-center gap-2">

          <div className="w-full grid grid-cols-1 gap-2">

            <div className="w-full text-left ml-1 text-nowrap text-md font-medium text-white">
              {city}, {country}
            </div>

            <div className="bg-[rgba(0,0,0,0.2)] w-full flex flex-col gap-3 rounded-lg text-white p-4">
              <div id="city_temp_left" className="flex gap-1">
                <div className="text-[58px] p-0 leading-13 font-semibold">{temp}</div>
                <div className="text-3xl">°C</div>
              </div>
              <div id="city_temp_right" className="mt-1 flex flex-col items-start gap-0">
                <div className="text-white text-md">Feels like: {feelsLike}°</div>
                <div className="text-gray-300 text-sm font-light">Min: {tempMin}°, Max: {tempMax}°</div>
              </div>
            </div>

            <div className="bg-[rgba(0,0,0,0.2)] w-full flex flex-col gap-2 rounded-lg text-white">
              {weather && (
                <div className="w-full flex items-center">
                  <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} className="scale-[100%]" />
                  <div className="flex flex-col items-start gap-0">
                    <div className="text-xl font-semibold">{weather.main}</div>
                    <div className="text-gray-300 text-sm font-light">{weather.description}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Item label="Humidity" value={humidity} />
              <Item label="Wind speed" value={windSpeed} />
              <Item label="Pressure" value={pressure} />
              <Item label="Visibility" value={visibility} />
            </div>

            <div className="bg-[rgba(0,0,0,0.2)] flex flex-col gap-1 items-start p-2 rounded-md text-gray-300 text-xs font-light">
              <p>Latitude: {data.coord.lat}</p>
              <p>Longitude: {data.coord.lon}</p>
              <p>Sea level: {data.main.sea_level}</p>
              <p>Ground level: {data.main.grnd_level}</p>
              <p>Cod: {data.cod}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

const Item = ({label, value}: {
  label: string,
  value: any
}) => {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] rounded-md flex flex-col gap-0 text-white p-2">
      <div className="text-gray-300 text-xs text-left">{label}</div>
      <div className="text-white text-md font-medium">{value}</div>
    </div>
  )
}