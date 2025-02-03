import { useState, useEffect } from "react";
import "../styles/CardList.css";
import {createClient} from 'pexels';    
import PropTypes from 'prop-types';

const client = createClient('Lh7d02tNnI2oGGvj51InF2LibvFEmWRusDbckjnG1YfVV7qnzpveIfHK');

function CardList() {

const [cards, setCards] = useState([]);
const query = 'snowboarding';
    useEffect(() => {
        client.photos.search({ query, per_page: 12, page: 1}).then((response) => {
            setCards(response.photos);
        });
    }, []);

    useEffect(() => {
        
    });

  return (
    <div className="card-list">
        {cards.map((card) => (
            <Card key={card.id} photo = {card}/>
        ))} 
    </div>
  );    
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at index i and j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


export function Card({photo}) {
    //add event listener to each card

    const handleClick = () => {
        console.log(photo.photographer);
    }
    return (
        <div className="card">
            <img src={photo.src.portrait} alt={photo.photographer} className='picture' onClick={handleClick}/>
        </div>
    );
    }

    Card.propTypes = {
        photo: PropTypes.object.isRequired,
    };


export default CardList;