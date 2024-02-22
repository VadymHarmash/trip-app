import React, { useEffect, useState } from 'react'
import styles from './content.module.scss'
import { AiOutlineSearch } from "react-icons/ai"
import Modal from '../Modal'
import Weather from '../Weather'

export default function Content() {
    const [weatherData, setWeatherData] = useState([])
    const [city, setCity] = useState('Odesa,UA')
    const [startDate, setStartDate] = useState('2024-02-23')
    const [endDate, setEndDate] = useState('2024-02-24')
    const [isOpen, setIsOpen] = useState(false)
    const [cards, setCards] = useState([{ city: "Odesa,UA", startDate: '2024-02-23', endDate: '2024-02-24' }])
    const [originalCards, setOriginalCards] = useState(cards)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?key=SP62YUEBKHJP67QUYEBXER344`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await response.json()
                setWeatherData(data.days)
            } catch (error) {
                console.error(error)
            }
        }

        fetchWeatherData()
    }, [city, startDate, endDate])

    const searchCity = (cityName) => {
        const filteredCities = originalCards.filter(card => card.city.toLowerCase().startsWith(cityName.toLowerCase()))
        setCards(cityName.trim() === '' ? originalCards : filteredCities)
    }

    const handleSearchChange = (e) => {
        const searchText = e.target.value
        setSearchText(searchText)
        searchCity(searchText)
    }

    const saveToTrips = (newCard) => {
        setCards(prevCards => [...prevCards, newCard])
        setOriginalCards(prevCards => [...prevCards, newCard])
        setIsOpen(false)
    }

    return (
        <div className={styles.content}>
            <div className={styles.content__wrapper}>
                <h2><span>Weather</span> Forecast</h2>
                <div className={styles.content__search} >
                    <AiOutlineSearch />
                    <input
                        type="text"
                        className={styles.content__search__input}
                        placeholder='Search your trip'
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={styles.content__trip}>
                    <div className={styles.content__trip__cards}>
                        {cards.map((card, index) => (
                            <div key={index} className={styles.content__trip__card} onClick={() => {
                                setCity(card.city)
                                setStartDate(card.startDate)
                                setEndDate(card.endDate)
                            }}>
                                <div className={styles.content__trip__card__image}></div>
                                <div className={styles.content__trip__card__city}>{card.city}</div>
                                <div className={styles.content__trip__card__dates}>
                                    <span>{card.startDate.split('-').reverse().join('.')} - {card.endDate.split('-').reverse().join('.')}</span>
                                </div>
                            </div>
                        ))}
                        <button className={styles.content__trip__add} onClick={() => setIsOpen(true)}>
                            <span>+</span>
                            <span>Add trip</span>
                        </button>

                        {isOpen && <Modal onClose={() => setIsOpen(false)} saveToTrips={saveToTrips} setCity={setCity} setStartDate={setStartDate} setEndDate={setEndDate} />}
                    </div>
                </div>
                <h3>Week</h3>
                <div className={styles.content__weather}>

                    {weatherData.map((item, index) => (
                        <div key={index}>
                            <img src={item.icon} alt={item.icon} />
                            <p>{item.datetime.split('-').reverse().join('.')}</p>
                            <p><span>{Math.round((item.tempmax - 32) * 5 / 9)}°</span> / <span>{Math.round((item.tempmin - 32) * 5 / 9)}°</span></p>
                        </div>
                    ))}
                </div>
            </div>
            <Weather city={city} />
        </div>
    )
}
