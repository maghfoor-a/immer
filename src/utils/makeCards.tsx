export function makeCards(): Card[] {
  const emojis = ["😎", "🐎", "💀", "🏈", "💗", "🌝", "🦚", "🐙"];
  const duplicateArr: string[] = [...emojis, ...emojis];

  return duplicateArr
    .map(cardify)
    .sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
    .sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
}

function cardify(emoji: string, index: number): Card {
  return {
    id: index + 1,
    emoji: emoji,
    life: "faceDown",
  };
}

export interface Card {
  id: number;
  emoji: string;
  life: "faceUp" | "faceDown" | "removed";
}

interface NoneTurned {
  title: "none-faceUp";
}
interface OneTurned {
  title: "one-faceUp";
  firstCard: Card;
}
interface TwoTurned {
  title: "two-faceUp";
  firstCard: Card;
  secondCard: Card;
}
export type TurnState = NoneTurned | OneTurned | TwoTurned;
