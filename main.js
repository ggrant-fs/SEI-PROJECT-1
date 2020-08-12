
// //----- CONSTANTS-----//
// const blackjack ={
//     player: null,
//     dealer: null,
//     cards: null,
// }

//----- STATE/VARIABLES-----//
// let rounds;
// let winner
// 
// let loser;
// let lost;
// let betAmount;
// let earnings;
// let double; 


//creating a deck


class Card {
    constructor(suit, value){
      this.suit = suit;
      this.value = value;
    }
  }
  
  class Deck{
    constructor(){
      this.deck =[];
    }
    createDeck(suits, values){
      for(let suit of suits){
        for(let value of values){
          this.deck.push(new Card(suit, value));
        }
      }
      return this.deck.length;
    }
    shuffle(){
      let counter = this.deck.length, temp, i;
      
      while(counter){
        i = Math.floor(Math.random() * counter --);
        temp = this.deck[counter];
        this.deck[counter] = this.deck[i];
        this.deck[i] = temp;
      }
      return this.deck;
    }
    deal(){
       let hand = [];
      while(hand.length < 2){
        hand.push(this.deck.pop());
      }
      return hand;
    }
   dealersHand(){
      let dealerCard = [];
     while(dealerCard.length < 2){
       dealerCard.push(this.deck.pop());
     }
     return dealerCard;
   }
    
  }
  let suits = [ "Hearts", "Diamonds", " Clubs", "Spades"];
  let values = [1,2,3,4,5,6,7,8,9,10,"Jack","Queen", "King", "Ace"];
  let deck = new Deck();
  deck.createDeck(suits,values);
  console.log(deck.shuffle());
  console.log(deck.deal(), deck.dealersHand());
  
  
  
  
    
    
  //----- CATCHED -----//  
        //html related //
  //----- EVENT LISTENERS-----//
       // html related //
  //----- FUNCTIONS-----//
  