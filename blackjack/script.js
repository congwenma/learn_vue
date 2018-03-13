import Card, { ORTHODOX_DECK, getSuitIcon, getSuitColor } from "../lib/card.js";
// const ORTHODOX_DECK = require("../lib/card");
// debugger;
window.Card = Card;
window.ORTHODOX_DECK = ORTHODOX_DECK;

const sum = ns => ns.reduce((accu, n) => accu + n, 0);
const app = new Vue({
  data: {
    message: {
      // text: "Hello Vue.js!",
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
      const playerScore = sum(this.player.cards.map(c => c.points));
      const cpuScore = sum(this.computer.cards.map(c => c.points));

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
      this.message.result = isVictorious ? "You Won!!!" : "You LOSE :)";
      this.message.result += `| score is ${playerScore} to ${cpuScore}`;
      this.player.cards = [];
      this.computer.cards = [];
      this.deck.reset();

      setTimeout(() => {
        // get around the system and call lifecycle
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

app.$mount("#app");
setTimeout(() => (app.message.text = "hello something different"), 2000);
