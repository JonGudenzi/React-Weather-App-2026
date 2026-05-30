export default function WeatherCard({ weatherData }) {
    return (
            <>
                <p>{weatherData.temperature}</p>
                <p>{weatherData.windspeed}</p>
                <p>{weatherData.time}</p>
            </>
    )
}