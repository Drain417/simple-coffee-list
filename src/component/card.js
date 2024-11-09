import React,{ useState } from "react";
import {sta,popular,lis, com,coffeeImage, soldOut,nam, pri, rat, vot, card } from "./card.module.scss"
import star from "../../public/Star.svg";
import starfill from "../../public/Star_fill.svg";

export default function Card({coffees, setCoffees}) {
    const [favorited, setFavorited] = useState({});

    function handleClick(id) {
        setFavorited((prev) => {

        const isFavorited = !prev[id];
            setCoffees((prevCoffees) =>
                prevCoffees.map(coffee => {
                    if (coffee.id === id) {
                        return {
                            ...coffee,
                            votes: isFavorited ? coffee.votes + 1 : coffee.votes - 1 };
                    }
                    return coffee;
                })
            );
        return {...prev, [id]: isFavorited};
        })
    }

    return (
        <div className={card}>
          {coffees.map((coffee) => (
              <div key={coffee.id} className={lis}>
                  <img src={coffee.image} alt={coffee.name} className={coffeeImage}/>
                  <div className={nam}>{coffee.name}</div>
                  <p className={pri}>{coffee.price}</p>
                  <div className={com}>
                      <button className={sta} onClick={() => handleClick(coffee.id)}>
                          <img src={favorited[coffee.id] ? starfill : star} alt="star" />
                      </button>
                      <p className={rat}>{coffee.rating} </p>
                      <p className={vot}>({coffee.votes} votes)</p>
                  </div>
                  {!coffee.available && (<div className={soldOut}>Sold out</div>)}
                  {coffee.popular && (<div className={popular}>Popular</div>)}
              </div>
          ))}
        </div>
  )
}