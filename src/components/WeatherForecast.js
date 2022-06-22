import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import transformImageUrl from "../helpers/transformImageUrl";
import { showMonth, showDay } from "../helpers/showDate";
import * as React from "react";

const WeatherForecast = () => {
  const [location, setLocation] = useState({});
  const [current, setCurrent] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isActive, setActive] = useState("");
  const [position, setPosition] = useState("iata:ifo");

  // const handleClickDay = (selectedDay) => () => {
  //   setSelectedDay(selectedDay);
  //   setActive(selectedDay.id);
  // };

  navigator.geolocation.getCurrentPosition(
    function(position)
    {
      setPosition(`${position.coords.latitude}, ${position.coords.longitude}`);
    },
    function(error)
    {
      if(error.PERMISSION_DENIED)
      {
        console.log(error.PERMISSION_DENIED);
      }
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("/forecast.json", {
        params: {
          key: "cb4978cabce04f54bbc125524221406",
          q: position,
          days: 1,
          aqi: "no",
          alerts: "no",
        },
      })
      .then((objectData) => {
        setLocation(objectData.location);
        setCurrent(objectData.current);
        setForecast(objectData.forecast.forecastday);
        setLoading(false);
      });
  }, [position]);
  // console.log("location", location);
  // console.log("current", current);
  // console.log("forecast", forecast);


  
  return (
    <>
      <h1>Weather forecast using geolocation</h1>
      {isLoading ? (
        <p className="large-text-temp">LOADING...</p>
      ) : (
        <>
          <div className="selected-day">
            <div className="temp-selected-day">
              <span className="extra-large-text" title="Температура воздуха">
                {current.temp_c > 0
                  ? `+${current.temp_c}`
                  : `${current.temp_c}`}
                {"\u00b0"}
              </span>
              <img
                src={transformImageUrl(current.condition.icon)}
                alt={current.condition.text}
                title={current.condition.text}
                width="128"
                height="128"
              />
            </div>

            <div className="box-selected-day">
              <p className="large-text">
                {showDay(current.last_updated_epoch * 1000)}
              </p>
              <p className="large-text">{showMonth(current.last_updated_epoch * 1000)}{" "}
                {new Date(current.last_updated_epoch * 1000).getDate()}
              </p>
              <p className="large-text" title={location.country}>
                {location.name}
              </p>
              <p className="large-text">{location.country}</p>
            </div>
          </div>
          {/* <ul className="list">
            {daysList.map((element) => (
              <li key={element.id} onClick={handleClickDay(element)}>
                <div
                  className={`list-item ${element.type} ${
                    isActive === element.id ? "active " : ""
                  }`}
                >
                  <p className="small-text">{showDay(element.day)}</p>
                  <p className="small-text">
                    {new Date(element.day).getDate()} {showMonth(element.day)}
                  </p>
                  <p className="large-text-temp">
                    {element.temperature}
                    {"\u00b0"}
                  </p>
                </div>
              </li>
            ))}
          </ul> */}
        </>
      )}
    </>
  );
};

export default WeatherForecast;
