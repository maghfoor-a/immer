export function makeCards(): Card[] {
    const emojis = ["😎", "🐎", "💀", "🏈", "💗", "🌝", "🦚", "🐙"]
    const duplicateArr: string[] = [...emojis, ...emojis]

    return duplicateArr.map(cardify).sort((a, b) => Math.random() > 0.5 ? -1 : 1).sort((a, b) => Math.random() > 0.5 ? -1 : 1)
}

function cardify(emoji: string, index: number): Card {
    return {
        id: index + 1,
        emoji: emoji,
        life: Math.random() > 0.5 ? "faceUp" : "faceDown"
    }
}

interface Card {
    id: number;
    emoji: string;
    life: "faceUp" | "faceDown" | "removed"
}
