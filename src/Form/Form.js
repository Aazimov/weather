import React from 'react';
import styles from "../Header/header.module.css";
import axios from "axios";

const Form = ({setCurrent, setFiveDays,setDate, isLight}) => {
    const getWeatherUseCityName = (e) =>{
        e.preventDefault();

        axios(`https://api.openweathermap.org/data/2.5/weather?q=${e.target[0].value}&appid=9b8f1cd8968f0e5ecd511188fc8be3cc`)
            .then(({data})=>setCurrent(data))
            .catch(()=>alert('Сизде мындай шаар жок, кайра жазып көрүңүз!'));

        axios(`https://api.openweathermap.org/data/2.5/forecast?q=${e.target[0].value}&appid=9b8f1cd8968f0e5ecd511188fc8be3cc`)
            .then(({data})=> {
                setFiveDays(data.list);
                setDate(data.list[0].dt_txt.slice(0, 10))
            });

        e.target[0].value = ''
    };
    return (
        <form className={styles.form} onSubmit={getWeatherUseCityName}>
            <input placeholder='Write city...' className={`${styles.input} ${isLight ? styles.light : ''}`} type="search" required/>
            <button className={`${styles.button} ${isLight ? styles.light : ''}`} type='submit'>Search</button>
        </form>
    );
};

export default Form;