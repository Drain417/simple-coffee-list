import React from 'react';
import ReactDOM from'react-dom/client';
import { useState } from 'react';
import { useEffect } from'react';
import Card from './component/card.js';
import {active , btn , btnContainer, vector, bgCoffee, bgBlack, container, title, dialog} from './index.module.scss';
import svgtoimg from '../public/vector.svg';

function App() {
    const [coffees, setCoffees] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [activeButton, setActiveButton] = useState('all');

useEffect(() => {
    fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json')
        .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
        })
        .then((data) => {
            setCoffees(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
}, []);

    const filteredCoffees = filter === 'available'
    ? coffees.filter(coffee => coffee.available)
        : coffees;

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <>
            <div className={container}>
                <div className={title}>Our Collection</div>
                <div className={dialog}>
                    Introducing our Coffee Collection, a selection of unique coffees from different roast types and
                    origins, expertly roasted in small batches and shipped fresh weekly.
                </div>
                <img src={svgtoimg} className={vector} alt="vector"/>
                <div className={btnContainer}>
                    <button
                        className={`${btn} ${activeButton === 'all' ? active : ''}`}
                        onClick={() => {
                            setFilter('all');
                            handleButtonClick('all')
                        }}
                    >All Products</button>
                    <button
                        className={`${btn} ${activeButton === 'available' ? active : ''}`}
                        onClick={() => {
                            setFilter('available')
                            handleButtonClick('available')}
                        }
                    >Available Now</button>
                </div>
                <Card coffees={filteredCoffees} setCoffees={setCoffees} loading={loading} error={error}/>
            </div>
            <div className={bgBlack}></div>
            <div className={bgCoffee}></div>
        </>
    );
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);