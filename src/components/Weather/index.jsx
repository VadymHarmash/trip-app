import React, { useEffect, useState } from 'react'
import styles from './weather.module.scss'

export default function Weather({ city }) {
    const [weather, setWeather] = useState([])
    const [date, setDate] = useState([])

    useEffect(() => {
        const getTodayWeather = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?key=SP62YUEBKHJP67QUYEBXER344`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json()
                setWeather(data)
                setDate(data.days)
            } catch (error) {
                console.error(error)
            }
        }

        getTodayWeather()
    }, [city])
    
    return (
        <div className={styles.weather}>
            <p>{weather.address}</p>
            {date && date.map((day, index) => (
                <div key={index}>
                    <p>Today's day: {day.datetime}</p>
                    <p>Actual weather: {Math.round((day.temp - 32) * 5 / 9)}°</p>
                </div>
            ))}
        </div>
    )
}
