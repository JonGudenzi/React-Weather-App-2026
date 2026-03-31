import { useState } from "react"

export default function App() {

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit() {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(function (data) {
        setWeatherData(data);
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
          <p>{weatherData.title}</p>
          <p>{weatherData.body}</p>
        </>
      )
      }
    </>
  )
}
