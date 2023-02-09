import { useState } from "react";
import { TurnState, Card, makeCards } from "../utils/makeCards";

export default function GameBoard(): JSX.Element {
    const [boardCards, setBoardCards] = useState<Card[]>(makeCards());
    const [turnState, setTurnState] = useState<TurnState>({
        title: "none-faceUp",
    });

    function turnCardFaceUp(cardToFlip: Card) {
        const updatedCards: Card[] = boardCards.map((card) => {
            if (card.id === cardToFlip.id) {
                return { ...card, life: "faceUp" };
            }
            return card;
        });
        setBoardCards(updatedCards);
        turnState.title === "none-faceUp"
            ? setTurnState({ title: "one-faceUp", firstCard: cardToFlip })
            : setTurnState({
                ...turnState,
                title: "two-faceUp",
                secondCard: cardToFlip,
            });
    }

    function checkIfCardsMatch(firstCard: Card, secondCard: Card) {
        //if cards don't match
        if (firstCard.emoji !== secondCard.emoji) {
            const updatedCards: Card[] = boardCards.map((card: Card) => {
                if (card.id === firstCard.id || card.id === secondCard.id) {
                    return { ...card, life: "faceDown" };
                }
                return card;
            });
            setBoardCards(updatedCards);
            setTurnState({ title: "none-faceUp" });
        }
        //if cards do match
        if (firstCard.emoji === secondCard.emoji) {
            const updatedCards: Card[] = boardCards.map((card: Card) => {
                if (card.id === firstCard.id || card.id === secondCard.id) {
                    return { ...card, life: "removed" };
                }
                return card;
            });
            setBoardCards(updatedCards);
            setTurnState({ title: "none-faceUp" });
        }
    }

    return (
        <>
            <h1>Game Board</h1>
            <p>{turnState.title}</p>
            {turnState.title === "two-faceUp" && (
                <button
                    onClick={() =>
                        checkIfCardsMatch(turnState.firstCard, turnState.secondCard)
                    }
                >
                    Acknowledge
                </button>
            )}
            <div className="all-cards">
                {boardCards.map((card) => {
                    return (
                        <div
                            key={card.id}
                            className={`card ${card.life}`}
                            onClick={() => {
                                turnState.title !== "two-faceUp" &&
                                    card.life === "faceDown" &&
                                    turnCardFaceUp(card);
                            }}
                        >
                            {card.life !== "faceDown" && <p>{card.emoji}</p>}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
