/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/CardList.css";
// import { createClient } from "pexels";

const apiKey = import.meta.env.VITE_API_KEY;
// const client = createClient(apiKey);

function CardList({ saveScore, query }) {
  const [cards, setCards] = useState([]);
  // useEffect(() => {
  //   client.photos.search({ query, per_page: 12, page: 1 }).then((response) => {
  //     setCards(response.photos);
  //   });
  // }, [query]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=12&page=1`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`, // Use your API key here
          },
          mode: 'cors', // Enable CORS mode for the request
        });
        if (response.ok) {
          const data = await response.json();
          setCards(data.photos); // Assuming the API returns photos in 'photos' field
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [query]);  

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
