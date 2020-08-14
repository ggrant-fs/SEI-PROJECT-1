# SEI-PROJECT-1
Blackjack game


<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title></title>
  <style>
    #output {
      font-size: 1.5em;
    }

    #btndeal,
    #myactions {
      display: none;
    }

    .btn {
      border-radius: 5px;
      padding: 8px 20px;
      color: white;
      display: inline-block;
      text-align: center;
      text-shadow: 1px 1px #000000;
      font: normal 700 24px/1 "Calibri", sans-serif;
    }

    #cover {
      height: 160px;
      width: 120px;
      background-color: brown;
      border-radius: 10px;
      position: absolute;
      border: 1px solid black;
      padding: 3px;
    }

    .icard {
      height: 160px;
      width: 120px;
      padding: 3px;
      border: 1px solid black;
      background-color: white;
      border-radius: 10px;
      position: absolute;
      left: 100px;
      display: inline-block;
      font-family: 'Lato';
    }

    .top-card {
      font-size: 30px;
      line-height: 20px;
      left: 2px;
      top: 2px;
    }

    .content-card {
      text-align: center;
      font-size: 70px;
    }

    .bottom-card {
      font-size: 30px;
      line-height: 20px;
      right: 2px;
      bottom: 2px;
      transform: rotate(-180deg);
      -webkit-transform: rotate(-180deg);
      -moz-transform: rotate(-180deg);
      -ms-transform: rotate(-180deg);
      -o-transform: rotate(-180deg);
    }

    .clubs,
    .spades {
      color: black;
    }

    .hearts,
    .diams {
      color: red;
    }

    .hearts .suit::after {
      content: '\2665';
    }

    .diams .suit::after {
      content: '\2666';
    }

    .spades .suit::after {
      content: '\2660';
    }

    .clubs .suit::after {
      content: '\2663';
    }

    #dealerHolder,
    #playerHolder {
      height: 180px;
      width: 500px;
    }

    #message {
      height: 70px;
      font-size: 30px;
      text-align: center;
    }

    #btnhold {
      background-color: green;
    }

    #btnhit {
      background-color: red;
    }

    #btndouble {
      background-color: blue;
    }

    #maxbet {
      background-color: red;
    }

    #btnstart {
      background-color: black;
    }

    .total {
      font-size: 30px;
    }
  </style>
</head>

<body>
  <div>
    <div>
      <h1>BlackJack Game</h1><small>Get to 21 or higher than the dealer</small>
      <div id="start">
        <button id="btnstart" type="button" onclick="Start()" class="btn">Start Game</button>
      </div>
      <div class="total">Total $<span id="dollars">100</span></div>
      <div>Bet Amount $<input type="number" id="mybet" value="0" min="1" max="100"><button id="maxbet" type="button" onclick="maxbet()" class="btn">Max Bet</button>
        <div>
          <button id="btndeal" type="button" onclick="dealNew()" class="btn">Deal</button>
        </div>
      </div>
      <div id="message">Press Start Button</div>

      <div id="output">
        Dealer Hand : <span id="dValue"></span>
        <div id="dealerHolder"></div>
        Player Hand : <span id="pValue"></span>
        <div id="playerHolder"></div>
        <div id="myactions">
          <button id="btnhold" type="button" onclick="cardAction('hold')" class="btn">Hold</button>
          <button id="btnhit" type="button" onclick="cardAction('hit')" class="btn">Hit</button>
          <button id="btndouble" type="button" onclick="cardAction('double')" class="btn">Double</button>
        </div>

      </div>

      <div>
      </div>
      <script>
        var cards = [];
        var playerCard = [];
        var dealerCard = [];
        var cardCount = 0;
        var mydollars = 100;
        var suits = ["spades", "hearts", "clubs", "diams"];
        var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var output = document.getElementById("output");
        var dealerHolder = document.getElementById("dealerHolder");
        var playerHolder = document.getElementById("playerHolder");

        for (s in suits) {
          var suit = suits[s][0].toUpperCase();
          var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
          for (n in numb) {
            //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
            var cardValue = (n > 9) ? 10 : parseInt(n) + 1
            var card = {
              suit: suit,
              icon: suits[s],
              bgcolor: bgcolor,
              cardnum: numb[n],
              cardvalue: cardValue
            }
            cards.push(card);
          }
        }

        function Start() {
          shuffleDeck(cards);
          dealNew();
          
          document.getElementById('dollars').innerHTML = mydollars;
        }

        function dealNew() {
          playerCard = [];
          dealerCard = [];
          dealerHolder.innerHTML = "";
          playerHolder.innerHTML = "";

          for (x = 0; x < 2; x++) {
            dealerCard.push(cards[cardCount]);
            dealerHolder.innerHTML += cardOutput(cardCount, x);
            if (x == 0) {
              dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
            }
            cardCount++
            playerCard.push(cards[cardCount]);
            playerHolder.innerHTML += cardOutput(cardCount, x);
            cardCount++
          }
          console.log(dealerCard);
          console.log(playerCard);

        }

        function cardOutput(n, x) {
          var hpos = (x > 0) ? x * 60 + 100 : 100;
          return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
            '<br></div> </div>';
        }

        function shuffleDeck(array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
          return array;
        }

        function outputCard() {
          output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
        }
      </script>
</body>

</html>
