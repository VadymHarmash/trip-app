import React, { useState } from 'react';
import styles from './modal.module.scss';

export default function Modal({ onClose, saveToTrips, setCity, setStartDate, setEndDate }) {
    const modalInfo = [
        {
            label: 'City',
            type: 'select',
            options: ['Odesa,UA', 'London,UK', 'Barcelona,ES', 'Tokyo,JA'],
            name: 'name'
        },
        {
            label: 'Start date',
            type: 'date',
            name: 'startDate'
        },
        {
            label: 'End date',
            type: 'date',
            name: 'endDate'
        },
    ]

    const [formData, setFormData] = useState({
        city: '',
        startDate: '',
        endDate: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'startDate' || name === 'endDate') {
            const formattedDate = value.split('-').join('-')
            setFormData({
                ...formData,
                [name]: formattedDate
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            city: e.target.value
        })
    }

    return (
        <div className={styles.modal} onClick={(e) => {
            return e.target === e.currentTarget ? onClose() : null;
        }}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <span>Create trip</span>
                        <span onClick={onClose}>X</span>
                    </div>
                    <div className={styles.modal__body}>
                        {modalInfo.map((item, index) => (
                            <div className={styles.modal__option} key={index}>
                                <label className={styles.modal__label}><span>*</span> {item.label}</label>
                                {item.type === 'select' ? (
                                    <select className={styles.modal__input} name={item.name} onChange={handleSelectChange}>
                                        <option value="">Please select</option>
                                        {item.options.map((option, index) => (
                                            <option key={index} value={option} className={styles.modal__dropdown__item}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input type={item.type} className={styles.modal__input} name={item.name} onChange={handleInputChange} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.modal__footer}>
                        <button className={styles.modal__close} onClick={onClose}>Cancel</button>
                        <button className={styles.modal__save} onClick={() => {
                            const isFormFilled = Object.values(formData).every(value => value !== '');
                            const isEndDateValid = formData.endDate > formData.startDate;

                            if (isFormFilled && isEndDateValid) {
                                saveToTrips(formData);
                                setCity(formData.city);
                                setStartDate(formData.startDate);
                                setEndDate(formData.endDate);
                            } else if (!isFormFilled) {
                                alert("Please fill in all fields before saving.");
                            } else {
                                alert('End date cannot be bigger than the start date.');
                            }
                        }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
