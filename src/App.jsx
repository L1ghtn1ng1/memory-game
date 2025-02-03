import { useState } from "react";
import CardList from "./components/CardList";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [currentCards, setCurrentCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [query, setQuery] = useState("snowboarding");

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

  const queryUpdate = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      e.target.value = "";
    }
  };



  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Memory Card Game</h1>
        <div className="scores">
          <h2 className="score">Score: {score}</h2>
          <h2 className="high-score">High Score: {highScore}</h2>
        </div>
        <div className="inputs">
          <input
            type="text"
            name="theme"
            id="theme"
            placeholder="Choose your own theme!"
            onKeyDown={queryUpdate}
          />
          {/* <input
            type="number"
            name="number"
            id="numPics"
            placeholder="Number of pictures"
          /> */}
        </div>
        <p>
          Click on pictures and remember which ones you have already clicked!
        </p>
      </div>

      <CardList saveScore={saveScore} query={query} />
    </div>
  );
}
export default App;
