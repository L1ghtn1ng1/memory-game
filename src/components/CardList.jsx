/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/CardList.css";
import { createClient } from "pexels";

const client = createClient(
  "Lh7d02tNnI2oGGvj51InF2LibvFEmWRusDbckjnG1YfVV7qnzpveIfHK"
);

function CardList({ saveScore }) {
  const [cards, setCards] = useState([]);
  const query = "snowboarding";
  useEffect(() => {
    client.photos.search({ query, per_page: 12, page: 1 }).then((response) => {
      setCards(response.photos);
    });
  }, []);

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
        <img
          src={photo.src.portrait}
          alt={photo.photographer}
          className="picture"
          onClick={handleClick}
        />
      </div>
    );
  }
}
export default CardList;
