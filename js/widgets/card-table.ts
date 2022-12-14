/**
 * class card table
 */

import { templateEngine } from "../common/template-engine";
import { randomSample } from "../common/random-sample";
import { randomShuffle } from "../common/random-shuffle";
import { timeout } from "../common/timeout";
import { cardTableTemplate } from "../templates/card-table";
import { Card } from "./card";

const CARDS: Array<TCard> = [
    { suit: "clubs", letter: "6" },
    { suit: "clubs", letter: "7" },
    { suit: "clubs", letter: "8" },
    { suit: "clubs", letter: "9" },
    { suit: "clubs", letter: "10" },
    { suit: "clubs", letter: "J" },
    { suit: "clubs", letter: "D" },
    { suit: "clubs", letter: "K" },
    { suit: "clubs", letter: "T" },

    { suit: "diamonds", letter: "6" },
    { suit: "diamonds", letter: "7" },
    { suit: "diamonds", letter: "8" },
    { suit: "diamonds", letter: "9" },
    { suit: "diamonds", letter: "10" },
    { suit: "diamonds", letter: "J" },
    { suit: "diamonds", letter: "D" },
    { suit: "diamonds", letter: "K" },
    { suit: "diamonds", letter: "T" },

    { suit: "hearts", letter: "6" },
    { suit: "hearts", letter: "7" },
    { suit: "hearts", letter: "8" },
    { suit: "hearts", letter: "9" },
    { suit: "hearts", letter: "10" },
    { suit: "hearts", letter: "J" },
    { suit: "hearts", letter: "D" },
    { suit: "hearts", letter: "K" },
    { suit: "hearts", letter: "T" },

    { suit: "spades", letter: "6" },
    { suit: "spades", letter: "7" },
    { suit: "spades", letter: "8" },
    { suit: "spades", letter: "9" },
    { suit: "spades", letter: "10" },
    { suit: "spades", letter: "J" },
    { suit: "spades", letter: "D" },
    { suit: "spades", letter: "K" },
    { suit: "spades", letter: "T" },
];

export class CardTable {
    element: HTMLElement;
    cards: Array<Card>;
    container?: HTMLElement;
    
    constructor() {
        this.element = templateEngine(cardTableTemplate) as HTMLElement;
        this.cards = [];
        this.container = undefined;
    }

    spreadOut(container: HTMLElement, pairsNumber: number) {
        const cardSet = randomSample(CARDS, pairsNumber);
        const pairsCardSet = [...cardSet, ...cardSet];
        const mixedPairsCardSet = randomShuffle(pairsCardSet);

        this.cards = [];

        if (this.container) {
            this.container.replaceChildren();
        }

        this.element.replaceChildren();

        this.container = container;

        mixedPairsCardSet.forEach((card) => {
            this.cards.push(new Card(this.element, card.suit, card.letter));
        });
        this.element.dataset.pairs = String(pairsNumber);

        this.container.appendChild(this.element);
    }

    async showAll(): Promise<void> {
        for (const card of this.cards) {
            card.show();
            await timeout(300);
        }
    }

    async hideAll(): Promise<void> {
        for (const card of this.cards.reverse()) {
            card.hide();
            await timeout(100);
        }
    }
}
