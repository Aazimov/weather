import React, {useEffect, useState} from 'react';

import './style.css'
import Header from "./Header/Header";
import Main from "./Main/Main";
import axios from "axios";
import Form from "./Form/Form";


const App = () => {

   const [current, setCurrent] = useState({});

   const [fiveDays, setFiveDays] = useState([]);

    const [date, setDate] =useState('');

    const [isLight, setIsLight] = useState(false)


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }




    function showPosition(position) {

        axios(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9b8f1cd8968f0e5ecd511188fc8be3cc`)
            .then(({data})=>setCurrent(data));

        axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9b8f1cd8968f0e5ecd511188fc8be3cc`)
            .then(({data})=> {
                setFiveDays(data.list);
                setDate(data.list[0].dt_txt.slice(0, 10))
            } )
    }

    useEffect(()=>{           //Принимет два параметры Колбек функция и время
        getLocation()
    },[]);



    return (
        <div className={`app ${isLight ? 'light' : ''}`}>
            {JSON.stringify(current) !== '{}' ? <>
                    <Header isLight={isLight} setIsLight={setIsLight} setFate={setDate} setFiveDays={setFiveDays} setCurrent={setCurrent}/>
                    <Main  isLight={isLight} current ={current} fiveDays={fiveDays} date={date} setDate={setDate}/>
                </>
                : <div className='block-for-form'>
                    <Form isLight={isLight}  setDate={setDate} setFiveDays={setFiveDays} setCurrent={setCurrent} />
                </div>
            }

        </div>
    );


};


export default App;