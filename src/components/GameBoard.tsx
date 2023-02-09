import { makeCards } from "../utils/makeCards"

export default function GameBoard(): JSX.Element {
    const allCards = makeCards()
    return (
        <>
            <h1>Game Board</h1>
            <div className="all-cards">
                {allCards.map(card => {
                    return (
                        <div key={card.id} className={`card ${card.life}`}>
                            {card.life === "faceUp" && <p>{card.emoji}</p>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}


