/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/CardList.css";
// import { createClient } from "pexels";

const apiKey = import.meta.env.VITE_API_KEY;
// const client = createClient(apiKey);

function CardList({ saveScore, query }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&orientation=portrait&per_page=12&client_id=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Store the full photo objects in the state
        setCards(data.results);
      })
      .catch((error) => console.error("Error fetching photos:", error));
  }, [query]); // Depend on query to refetch when it changes

  console.log(cards);

  const shuffleArray = (card) => {
    setCards((prevCards) => {
      const shuffled = [...prevCards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    saveScore(card.id);
  };

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          photo={card}
          handleClick={() => shuffleArray(card)}
        />
      ))}
    </div>
  );

  function Card({ photo, handleClick }) {
    return (
      <div className="card">
        <img src={photo.urls.regular} className="picture" onClick={handleClick} />
      </div>
    );
  }
}
export default CardList;
