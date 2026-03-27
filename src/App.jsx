import { useState } from "react"

export default function App() {

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  function handleSubmit() {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(function (data) {
        setWeatherData(data);
        console.log(data);
      })
      .then(() => setLoading(false));
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
      disabled = {loading}>Submit</button>

      {loading && <p>loading...</p>}
      {weatherData && <p>{weatherData.title}</p>}
    </>
  )
}
