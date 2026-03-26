import { useState } from "react"

export default function App() {

  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(function (data) {
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

      <button onClick={handleSubmit}>Submit</button>

      {loading && <p>loading...</p>}
    </>
  )
}
