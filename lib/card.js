const flatten = arrays => {
  return arrays.reduce((accu, cur) => accu.concat(cur), []);
};
const BLACK = "#888";
const RED = "#c66";

const MagicGetter = new Proxy(
  {},
  {
    get: (_, name) => name
  }
);
const { HEART, SPADE, DIAMOND, CLUB } = MagicGetter;
const RANKS = "123456789XJQK".split("");
const SUITS = [HEART, SPADE, DIAMOND, CLUB];
const SUIT_ICONS = {
  SPADE: "&#9824;",
  HEART: "&#9829;",
  CLUB: "&#9827;",
  DIAMOND: "&#9830;"
};
const SUIT_COLORS = {
  SPADE: BLACK,
  HEART: RED,
  CLUB: BLACK,
  DIAMOND: RED
};

export const getSuitIcon = suit => SUIT_ICONS[suit];
export const getSuitColor = suit => SUIT_COLORS[suit];

export default class Card {
  constructor({ suit, rank }) {
    this.suit = suit;
    this.rank = rank;
  }
}

export const ORTHODOX_DECK = flatten(
  RANKS.map(rank => SUITS.map(suit => new Card({ rank, suit })))
);

export const DECK = [
  ...ORTHODOX_DECK,
  // Jokers
  new Card({ rank: "Z", suit: "RED" }),
  new Card({ rank: "Z", suit: "BLACK" })
];

// TODO:
// - shuffle
// - length
// - pick one from top
// - pick one bottom
// - put a card back randomly
// - cut
// - export into an npm module
