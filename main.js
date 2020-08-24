const cards = [];
const playerCard = [];
const dealerCard = [];
const cardCount = 0;
const mydollars = 100;

let endplay = false;

const suits = ["spades", "hearts", "clubs", "diams"];
const numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const  message = document.getElementById("message");
const output = document.getElementById("output");
const dealerHolder = document.getElementById("dealerHolder");
const playerHolder = document.getElementById("playerHolder");
const pValue = document.getElementById("pValue");
const dValue = document.getElementById("dValue");
const dollarValue = document.getElementById("dollars");

for (s in suits) {
  var suit = suits[s][0].toUpperCase();
  let bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
  for (n in numb) {
    //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
    let cardValue = (n > 9) ? 10 : parseInt(n) + 1
    const card = {
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
  document.getElementById('start').style.display = 'none';
  document.getElementById('dollars').innerHTML = mydollars;
}

function dealNew() {
  playerCard = [];
  dealerCard = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";
  const betvalue = document.getElementById('mybet').value;
  mydollars=mydollars-betvalue;
  document.getElementById('dollars').innerHTML = mydollars;
  document.getElementById('myactions').style.display = 'block';
  message.innerHTML = "Get up to 21 and beat the dealer to win.<br>Current bet is $"+betvalue;
  document.getElementById('mybet').disabled = true;
  document.getElementById('maxbet').disabled = true;
  deal();
}

function deal(){
  console.log(cards);
  // card count reshuffle
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

   pValue.innerHTML = checktotal(playerCard);
   console.log(dealerCard);
   console.log(playerCard);
}

function cardOutput(n, x) {
  let hpos = (x > 0) ? x * 60 + 100 : 100;
  return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
    '<br></div> </div>';
}

function cardAction(a){
  console.log(a);
  switch (a){
    case 'hit':
      playucard(); // add new card to players hand
      break;
    case 'hold':
      playend(); // playout and calculate
      break;
    case 'double':
      // double current bet remove value from mydollars
      playucard(); // add new card to players hand
      playend(); // playout and calculate
      break;
    default:
      console.log('done');
      playend(); // playout and calculate
  }
}
function playucard(){
  playerCard.push(cards[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length -1));
  cardCount++;
  let rValu = checktotal(playerCard);
  pValue.innerHTML = rValu;
  if(rValu>21){
    message.innerHTML = "busted!";
    playend();
  }
}

function playend(){
  endplay = true;
  document.getElementById('cover').style.display = 'none';
  document.getElementById('myactions').style.display = 'none';
  document.getElementById('btndeal').style.display = 'block';
  document.getElementById('mybet').disabled = false;
  document.getElementById('maxbet').disabled = false;
  message.innerHTML = "Game Over";
  let payoutJack = 1;
  let dealervalue =  checktotal(dealerCard);
  dValue.innerHTML = dealervalue;

  while(dealervalue<17){
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length -1));
    cardCount++;
    dealervalue =  checktotal(dealerCard);
    dValue.innerHTML = dealervalue;
  }

  //WHo won???
  const playervalue =  checktotal(playerCard);
  if(playervalue == 21 && playerCard.length == 2){
    message.innerHTML = "Player Blackjack";
     payoutJack = 1.5;
  }

  var betvalue = parseInt(document.getElementById('mybet').value)*payoutJack;

  if((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22 )){
    message.innerHTML += '<span style="color:green;">You WIN! You won $'+betvalue+'</span>';
    mydollars = mydollars + (betvalue *2);
  }
  else if (playervalue > 21){
    message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $'+betvalue+'</span>';
  }
  else if (playervalue == dealervalue) {
    message.innerHTML += '<span style="color:blue;">PUSH</span>';
    mydollars = mydollars + betvalue ;
  }
  else {
    message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $'+betvalue+'</span>';
  }

  pValue.innerHTML = dealervalue;
  dollarValue.innerHTML = mydollars;
}

function checktotal(arr){
  let rValue = 0;
  const aceAdjust = false;
  for(let i in arr ){
    if(arr[i].cardnum =='A' && !aceAdjust){
      aceAdjust=true;
      rValue=rValue+10;
    }
    rValue=rValue+arr[i].cardvalue;
  }

  if(aceAdjust && rValue >21  ){
    rValue=rValue-10;
  }
  return rValue;
}

function shuffleDeck(array) {
  for (var i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function outputCard() {
  output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}