import Card, { ORTHODOX_DECK, getSuitIcon, getSuitColor } from "../lib/card.js";
// const ORTHODOX_DECK = require("../lib/card");
// debugger;
window.Card = Card;
window.ORTHODOX_DECK = ORTHODOX_DECK;
const checkVictory = (playerCards, cpuCards) => {
  const playerScore = sum(playerCards.map(c => c.points));
  const cpuScore = sum(cpuCards.map(c => c.points));

  let isVictorious;
  if (playerScore <= 21) {
    if (cpuScore <= 21) {
      isVictorious = playerScore > cpuScore;
    } else {
      isVictorious = true;
    }
  } else {
    if (cpuScore <= 21) {
      isVictorious = false;
    } else {
      isVictorious = cpuScore > playerScore;
    }
  }
  return [isVictorious, cpuScore, playerScore];
};

const sum = ns => ns.reduce((accu, n) => accu + n, 0);
const app = new Vue({
  data: {
    isDone: false,
    message: {
      result: ""
    },
    deck: ORTHODOX_DECK,
    computer: {
      cards: []
    },
    player: {
      cards: []
    }
  },
  methods: {
    shuffle: () => ORTHODOX_DECK.shuffle(),
    hitplayer: function() {
      this.player.cards.push(this.deck.pullOneOut());
    },
    done() {
      this.isDone = true;
      const [isVictorious, cpuScore, playerScore] = checkVictory(
        this.player.cards,
        this.computer.cards
      );
      this.message.result =
        (isVictorious ? "You Won!!!" : "You LOSE :)") +
        `| score is ${playerScore} to ${cpuScore}`;

      setTimeout(() => {
        this.isDone = false;
        this.player.cards = [];
        this.computer.cards = [];
        this.deck.reset();

        // got around the system and call lifecycle
        this.$options.created[0].call(this);
        this.message.result = "";
      }, 2000);
    }
  },
  created: function() {
    this.deck.shuffle();
    this.computer.cards.push(this.deck.pullOneOut(), this.deck.pullOneOut());
    this.player.cards.push(this.deck.pullOneOut(), this.deck.pullOneOut());
  }
});

// TAKEAWAY: v-html escapes innerhtml
Vue.component("card-item", {
  props: ["card", "facedown"],
  template: `
    <li class="card inline-block" >
      <div class="box" v-bind:class="{'card--back': facedown }">
        <span v-html="getSuitIcon(card.suit)" v-bind:style="{ color: getSuitColor(card.suit) }"></span>
        <span>{{card.rank}}</span>
      </div>
    </li>
  `,
  methods: {
    getSuitIcon,
    getSuitColor
  }
});

Vue.component("card-deck", {
  props: ["deck"],
  template: `
    <ul class="deck list-reset" @click="hitplayer()">
      <card-item v-for="card in deck.cards" v-bind:card="card" v-bind:key="card.suit + card.rank" v-bind:facedown="true">
      </card-item>
    </ul>
  `,
  methods: {
    hitplayer() {
      this.$emit("hitplayer");
    }
  }
});

Vue.component("cpu-hand", {
  props: ["hand", "isdone"],
  template: `
    <div class="inline-block" style="width:49%">
      <h2>Computer</h2>
      <ul class="hand list-reset">
        <card-item
          v-for="(card, index) in hand"
          v-bind:card="card"
          v-bind:key="card.suit + card.rank"
          v-bind:facedown="index === 0 && !isdone"
        >
        </card-item>
      </ul>
    </div>
  `
});

Vue.component("player-hand", {
  props: ["hand"],
  template: `
    <div class="inline-block" style="width:49%">
      <h2>Human</h2>
      <ul class="hand list-reset">
        <card-item
          v-for="card in hand"
          v-bind:card="card"
          v-bind:key="card.suit + card.rank"
        >
        </card-item>
      </ul>
    </div>
  `
});

app.$mount("#app");
