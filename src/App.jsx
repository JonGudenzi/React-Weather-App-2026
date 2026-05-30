import { useState } from "react"
import WeatherCard from "./WeatherCard";

export default function App() {

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit() {
    setLoading(true);
    setError(null);

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}`)
      .then(response => response.json())
      .then(function (data) {
        if (data.results && data.results.length > 0) {
          const latitude = data.results[0].latitude;
          const longitude = data.results[0].longitude;
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
            .then(response => response.json())
            .then(function (data) {
              setWeatherData(data.current_weather);
              console.log(data.current_weather);
              setLoading(false);
            })
          setError(null);
        }
        else {
          setError("City not found");
          setLoading(false);
        }
        console.log(data);
      });
  }

  function getWeatherDescription(weathercode) {
    if (weathercode === 0) {
      return "Clear Sky";
    } else if (weathercode === 1) {
      return "Mostly Clear";
    } else if (weathercode === 2) {
      return "Partly Cloudy";
    } else if (weathercode === 3) {
      return "Overcast";
    } return "Unknown Weather";
  }

  return (
    <>
      <input
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        type="text"
        placeholder="Enter City" />

      <button
        onClick={handleSubmit}
        disabled={loading}>Submit</button>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && 
      <WeatherCard 
      weatherData={weatherData}
      getWeatherDescription={getWeatherDescription} />}
    </>
  )
}
