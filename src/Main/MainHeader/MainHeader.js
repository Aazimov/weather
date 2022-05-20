import React from 'react';
import Day from '../../assets/icons/day.svg'
import styles from './MainHeader.module.css'
import Thermometer from '../../assets/icons/temp.svg'
import Pressure from '../../assets/icons/davlen.svg'
import Precipitation from '../../assets/icons/osadka.svg'
import Wind from '../../assets/icons/wind.svg'

const MainHeader = ({current, isLight}) => {

    const addZero = (num)=>{
        if(num < 10)return `0${num}`;
        else return num
    };

    const cityTime = () =>{
        let d = new Date(),
            utc = d.getTime() + (d.getTimezoneOffset()*60000),
            nd = new  Date(utc + (1000* current.timezone)),
            hours = addZero(nd.getHours()),
            minutes = addZero(nd.getMinutes());
            return `${hours} : ${minutes}`
    };


    return (
        <div className={styles.mainHeader}>

            <div className={`${styles.left} ${isLight ? styles.light : ''}`} >

                <div  className={styles.leftTop}>
                    <div className={styles.leftTopLeft}>
                        <p className={styles.drg}>{(current.main.temp -273.15).toFixed()}°</p>
                        <p className={styles.today}>Today</p>
                    </div>
                    <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt=""/>
                </div>
                <p className={styles.infoText}>Time : {cityTime()}</p>
                <p className={styles.infoText}>City : {current.name}</p>


            </div>

            <div className={`${styles.right} ${isLight ? styles.light : ''}`}>
                <ul className={styles.list}>

                    <li className={styles.item}>
                        <div className={styles.circle}>
                            <img src={Thermometer} alt=""/>
                        </div>
                        <p className={styles.category}>Temperature</p>
                        <p className={styles.categoryValue}>{(current.main.temp -273.16).toFixed()}° - feels like {(current.main.feels_like -273.16).toFixed()}°</p>
                    </li>

                    <li className={styles.item}>
                        <div className={styles.circle}>
                            <img src={Pressure} alt=""/>
                        </div>
                        <p className={styles.category}>Pressure</p>
                        <p className={styles.categoryValue}>{current.main.pressure}mmHg - normal</p>
                    </li>

                    <li className={styles.item}>
                        <div className={styles.circle}>
                            <img src={Precipitation} alt=""/>
                        </div>
                        <p className={styles.category}>Precipitation</p>
                        <p className={styles.categoryValue}>{current.weather[0].description}</p>
                    </li>

                    <li className={styles.item}>
                        <div className={styles.circle}>
                            <img src={Wind} alt=""/>
                        </div>
                        <p className={styles.category}>Wind</p>
                        <p className={styles.categoryValue}>{current.wind.speed} m/s</p>
                    </li>

                </ul>


            </div>
        </div>
    );
};

export default MainHeader;