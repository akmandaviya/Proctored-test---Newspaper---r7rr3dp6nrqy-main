import React, { useState, useEffect } from "react";

const APIKey = "1840908a9328393b1d73639cc7eed47f";

const WeatherCard = ({ temprature, city, country, weather }) => {
  let date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateObj = {
    date: date.getDate(),
    month: month[date.getMonth()],
    year: date.getFullYear(),
    day: day[date.getDay()],
  };
  return (
    <div className="card">
      <div className="c-left">
        <span>{temprature}</span>
        <span>°C</span>
        <span>{city},</span>
        <span>{country}</span>
      </div>
      <div className="c-right">
        <span>{weather}</span>
        <span>{`${dateObj.date} ${dateObj.month} ${dateObj.year}`}</span>
        <span>{`${dateObj.day}`}</span>
      </div>
    </div>
  );
};

const Weather = () => {
  const [temprature, setTemprature] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultDataFetched = async (currLocation) => {
    let latitude = currLocation.coords.latitude;
    let longitude = currLocation.coords.longitude;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
    );
    const data = await res.json();

    setTemprature(Math.round(data.main.temp))
    setCity(data.name);
    setCountry(data.sys.country);
    setWeather(data.weather[0].description);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(defaultDataFetched);
  }, []);
  return (
    <WeatherCard
      temprature={temprature}
      city={city}
      country={country}
      weather={weather}
    />
  );
};

export default Weather;