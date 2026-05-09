import { useState, useEffect } from "react";
export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const initalizeGame = () => {
    // shuffle game

    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => {
      return {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      };
    });

    setCards(finalCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsLocked(false);
    setMove(0);
    setScore(0);
  };

  useEffect(() => {
    initalizeGame();
  }, []);

  const handleCardClick = (card) => {
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    )
      return;

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

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);
    let firstCard;
    if (flippedCards.length === 1) {
      setIsLocked(true);
      firstCard = cards[flippedCards[0]];
    }

    if (firstCard.value === card.value) {
      setTimeout(() => {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

        setCards((prev) =>
          prev.map((c) => {
            if (c.id === card.id || c.id === firstCard.id)
              return {
                ...c,
                isMatched: true,
              };
            else {
              return c;
            }
          }),
        );
        setFlippedCards([]);
        setIsLocked(false);
      }, 500);

      setScore((prev) => prev + 1);
    } else {
      setTimeout(() => {
        const flippedBackCard = newCards.map((c) => {
          if (newFlippedCards.includes(c.id)) return { ...c, isFlipped: false };
          else {
            return c;
          }
        });
        setCards(flippedBackCard);
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
    setMove((prev) => prev + 1);
  };

  const winState = matchedCards.length === cards.length;

  return { cards, score, move, winState, initalizeGame, handleCardClick };
};
