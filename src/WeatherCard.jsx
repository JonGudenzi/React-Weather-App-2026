export default function WeatherCard({ weatherData, getWeatherDescription }) {
    return (
        <>
            <p>{weatherData.temperature}°</p>
            <p>{weatherData.windspeed} mph</p>
            <p>{getWeatherDescription(weatherData.weathercode)}</p>
            <p>{weatherData.time}</p>
        </>
    )
}