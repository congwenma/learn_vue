import Card, { ORTHODOX_DECK, getSuitIcon, getSuitColor } from "../lib/card.js";
// const ORTHODOX_DECK = require("../lib/card");
// debugger;
window.Card = Card;
window.ORTHODOX_DECK = ORTHODOX_DECK;
const app = new Vue({
  data: {
    message: {
      text: "Hello Vue.js!"
    },
    deck: {
      cards: ORTHODOX_DECK
    }
  }
});

// TAKEAWAY: v-html escapes innerhtml
Vue.component("card-item", {
  props: ["card"],
  template: `
    <li class="card inline-block col-xs-2 col-sm-1 p1">
      <div class="box">
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
