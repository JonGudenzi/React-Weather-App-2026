import { useState } from "react"
import WeatherCard from "./WeatherCard";

export default function App() {

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [locationResults, setLocationResults] = useState([]);
  const [error, setError] = useState(null);

  function handleSubmit() {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}`)
      .then(response => response.json())
      .then(function (data) {
        if (data.results && data.results.length > 0) {
          setLocationResults(data.results);
          setError(null);
          setLoading(false);
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

  function handleLocationSelect(location) {
    const latitude = location.latitude;
    const longitude = location.longitude;
    setLoading(true);
    setError(null);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`)
            .then(response => response.json())
            .then(function (data) {
              setWeatherData(data.current_weather);
              setLocationResults([]);
              console.log(data.current_weather);
              setLoading(false);
            })
            .catch(function () {
              setError("Weather service is unavailable.")
              setLoading(false);
            })
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

      <>
        {locationResults.map((location) => {
          return (<button onClick={() => handleLocationSelect(location)}>
            {location.name} {"- "}
            {location.admin1} {"- "}
            {location.country}
          </button>
          )
        })}
      </>

      {weatherData &&
        <WeatherCard
          weatherData={weatherData}
          getWeatherDescription={getWeatherDescription} />}
    </>
  )
}
