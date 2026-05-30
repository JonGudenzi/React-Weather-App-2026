export default function WeatherCard({ weatherData, getWeatherDescription }) {
    return (
        <>
            <p>{weatherData.temperature}</p>
            <p>{weatherData.windspeed}</p>
            <p>{getWeatherDescription(weatherData.weathercode)}</p>
            <p>{weatherData.time}</p>
        </>
    )
}