import { useEffect, useState } from "react";
import axiosWeatherAPI from "../helpers/axiosGeoIP";
import { showMonth, showDay } from "../helpers/showDate";
import * as React from "react";

const WeatherAPI = () => {
  const [location, setLocation] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosWeatherAPI
      .get("/forecast.json", {
        params: {
          key: "cb4978cabce04f54bbc125524221406",
          q: "iata:IFO",
          days: 1,
          aqi: "no",
          alerts: "no",
        },
      })
      .then((objectData) => {
        setLocation(objectData.location);
        setCurrentWeather(objectData.current);
        setForecast(objectData.forecast);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Weather forecast</h1>
      {isLoading ? (
        <p className="large-text-temp">LOADING...</p>
      ) : (
        <><p>{showDay(current.last_updated_epoch * 1000)}</p>
          <p>{location.name}</p>
          <p>{showMonth(currentWeather.last_updated_epoch * 1000)}{", "}
            {new Date(currentWeather.last_updated_epoch * 1000).getDate()}
          </p>
          <p>
            {currentWeather.temp_c}
            {"\u00b0"}
          </p>
          <img src={`http:${currentWeather.condition.icon}`} />
        </>
      )}
    </div>
  );
};
export default WeatherAPI;
