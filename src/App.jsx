import { useState } from "react";
import CardList from "./components/CardList";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [currentCards, setCurrentCards] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const saveScore = (id) => {
    if (currentCards.includes(id)) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setCurrentCards([]);
    } else {
      setScore(score + 1);
      setCurrentCards([...currentCards, id]);
    }
  };
  console.log(score);

  return (
    <>
      <div className="header">
        <h1 className="title">Memory Card Game</h1>
        <div className="scores">
          <h2 className="score">Score: {score}</h2>
          <h2 className="high-score">High Score: {highScore}</h2>
        </div>
      </div>

      <CardList saveScore={saveScore} />
    </>
  );
}

export default App;
