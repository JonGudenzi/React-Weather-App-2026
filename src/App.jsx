import { useState } from "react"

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
        if (data.results.length > 0) {
          setWeatherData(data.results[0]);
          const latitude = data.results[0].latitude;
          const longitude = data.results[0].longitude;
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
          .then(response => response.json())
          .then(function (data) {
          console.log(data);
          })
          setError(null);
        }
        else {
          setError("City not found");
        }
        console.log(data);
        setLoading(false);
      });
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
      {weatherData && (
        <>
          <p>{weatherData.name}</p>
          <p>{weatherData.latitude}</p>
          <p>{weatherData.longitude}</p>
        </>
      )
      }
    </>
  )
}
