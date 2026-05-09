import { GameHeader } from "./Componenets/GameHeader";
import { Card } from "./Componenets/Card";
import { WinMessage } from "./Componenets/WinMessage";
import "./index.css";
import { useEffect, useState } from "react";
import { useGameLogic } from "./Hooks/useGameLogic";

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
  const { cards, score, move, winState, initalizeGame, handleCardClick } =
    useGameLogic(cardValues);
  return (
    <div className="app">
      <GameHeader score={score} move={move} onReset={initalizeGame} />
      {winState && <WinMessage move={move} />}{" "}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
