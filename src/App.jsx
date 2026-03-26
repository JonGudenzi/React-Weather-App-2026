import { useState } from "react"

export default function App() {

  const [cityInput, setCityInput] = useState("");
 
function handleSubmit() {
  
}

  return(
    <>
    <input
    value={cityInput} 
    onChange={(e) => setCityInput(e.target.value)}
    type="text" 
    placeholder="Enter City" />

    

    <button onClick={handleSubmit}>Submit</button>
    </>
  )
  
}
