export default function WeatherCard({ weatherData, getWeatherDescription, selectedLocation }) {
    return (
        <>
            <h2>
                {selectedLocation.name},
                {selectedLocation.admin1}
            </h2>
            <p>{weatherData.temperature}°</p>
            <p>{weatherData.windspeed} mph</p>
            <p>{getWeatherDescription(weatherData.weathercode)}</p>
            <p>{weatherData.time}</p>
        </>
    )
}