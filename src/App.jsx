import { GameHeader } from "./Componenets/GameHeader";
import { Card } from "./Componenets/Card";
import "./index.css";
import { useEffect, useState } from "react";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const [cards, setCards] = useState([]);

  const initalizeGame = () => {
    // shuffle game

    const finalCards = cardValues.map((value, index) => {
      return {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      };
    });

    setCards(finalCards);
  };

  useEffect(() => {
    initalizeGame();
  }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) => {
      if (c.id === card.id)
        return {
          ...c,
          isFlipped: true,
        };
      else {
        return c;
      }
    });
    setCards(newCards);
  };

  return (
    <div className="app">
      <GameHeader score={3} move={10} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
