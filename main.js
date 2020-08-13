
// //----- CONSTANTS-----//
const suits = [ "Hearts", "Diamonds", " Clubs", "Spades"];
const ranks= [1,2,3,4,5,6,7,8,9,10,"Jack","Queen", "King", "Ace"];

//----- STATE/VARIABLES-----//

let gameStarted =false;
let gameOver = false;
let playerWon =false;
let playerScore = 0 ;
let dealerScore = 0;

//creating a deck

class Cards{
    consturctor(suits, ranks){
        this.suits = suits;
        this.ranks= ranks ;
    } 
   getCardRank(ranks){
       if(ranks === "Ace"){
           return 11;
       }else if(["Jack","Queen","King"]){
           return 10;
       }
       return parseInt(ranks);
   }   
    
}
// let newCard = new Cards( ,);
// console.log(newCard.getCardRank("Queen","Ace"));

class Deck{
    constructor(){
        this.deck =[];
    }
    createDeck(ranks, suits){
        for(let rank of ranks){
            for(let suit of suits){
                this.deck.push(new Cards(rank,suit));
            }
            return this.deck; 
        }
        
    }

    randomCardIndex() {
        return Math.trunc(Math.random() * deck.length);
      
    }

    shuffleDeck(deck) {
        for (let i = 0; i < deck.length; i++) {
            let shuffleIndex = Math.trunc(Math.random() * deck.length);
            let temp = deck[shuffleIndex];
            deck[shuffleIndex] = deck[i];
            deck[i] = temp;
        }
    }
    
    
}

console.log(Deck.shuffleDeck());



  
  
  
    
    
  //----- CATCHED -----//  
        //html related //
  //----- EVENT LISTENERS-----//
       // html related //
  //----- FUNCTIONS-----//
  