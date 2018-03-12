const flatten = arrays => {
  return arrays.reduce((accu, cur) => accu.concat(cur), []);
};

const MagicGetter = new Proxy(
  {},
  {
    get: (_, name) => name
  }
);
const { HEART, SPADE, DIAMOND, CLUB } = MagicGetter;
const RANKS = ["123456789XJQK"].split("");
const SUITS = [HEART, SPADE, DIAMOND, CLUB];

export const ORTHODOX_DECK = flatten(RANKS.map(rank => SUITS.map(suit => new Card({ rank, suit })))),
const DECK = [
  ...ORTHODOX_DECK,
  new Card({ rank: "Z", suit: "RED" }), // Joker
  new Card({ rank: "Z", suit: "BLACK" }) // Joker
];

class Card {
  constructor({ suit, rank }) {}
}

export const DECK = DECK;
