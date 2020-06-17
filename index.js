// console.log("ramen game")

const noodleUrl = 'http://localhost:3000/api/v1/noodles'
const userUrl = 'http://localhost:3000/api/v1/users'
const scoreUrl = 'http://localhost:3000/api/v1/scores'

const cardBack = 'https://i.imgur.com/eUtXyTs.jpg'
const formInput = document.querySelector("#userForm > p:nth-child(2) > input[type=text]")
const statusBox = document.getElementById("statusBox")
const userForm = document.getElementById("userForm")
const ramenCard = document.getElementsByClassName("ramen-card")
const ramenCell = document.getElementsByClassName("ramen-cell")
// √ need url constants for ramen/user/score
// √ need constant for card back image

// console.log(ramenCard[0])

const card1 = ramenCard[0]
const card2 = ramenCard[1]
const card3 = ramenCard[2]
const card4 = ramenCard[3]
const card5 = ramenCard[4]
const card6 = ramenCard[5]
const card7 = ramenCard[6]
const card8 = ramenCard[7]

function renderCard(card){
    card.src = cardBack
}



let ramenOne = {
    "name": "ichiran",
    "imageUrl": "https://i.imgur.com/xWTTbBx.jpg"
  }
let ramenTwo = {
    "name": "momosan",
    "imageUrl": "https://i.imgur.com/VCbUDIA.jpg"
  }
let ramenThree = {
    "name": "nakiryu",
    "imageUrl": "https://i.imgur.com/Ii1vbsK.jpg"
  }

let ramenFour = {
    "name": "tsuta",
    "imageUrl": "https://i.imgur.com/UwPJR2C.jpg"
  }

const ramenArray = [ramenOne, ramenOne, ramenTwo, ramenTwo, ramenThree, ramenThree, ramenFour, ramenFour]


// fisher-yates shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


let ramenShuffledArray = ramenArray


shuffle(ramenShuffledArray)
console.log(ramenShuffledArray[0])

function generateBoard(){
    card1.src = cardBack
    card1.dataset.ramen = ramenShuffledArray[0].name

    card2.src = cardBack
    card2.dataset.ramen = ramenShuffledArray[1].name
    
    card3.src = cardBack
    card3.dataset.ramen = ramenShuffledArray[2].name
    
    card4.src = cardBack
    card4.dataset.ramen = ramenShuffledArray[3].name

    card5.src = cardBack
    card5.dataset.ramen = ramenShuffledArray[4].name
    
    card6.src = cardBack
    card6.dataset.ramen = ramenShuffledArray[5].name

    card7.src = cardBack
    card7.dataset.ramen = ramenShuffledArray[6].name

    card8.src = cardBack
    card8.dataset.ramen = ramenShuffledArray[7].name

}


// ramenCard.foreach(renderCard(card))

// function renderCards(cards){
//     cards.forEach(function(card){
//         renderCard(card)
//     })
// }

document.addEventListener('submit', function(e){
    e.preventDefault()

    userName = formInput.value
    
    console.log(userName)
//fetch post start
    fetch(userUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
                name: userName
            })

    })
//fetch post end
    // .then(response => response.json())
    // .then(console.log)

    statusBox.innerHTML = `Hi ${userName}, try to find all the pairs of ramen in the fewest guesses.`

    userForm.remove()

    generateBoard()

})




//- need name submit form 
    // √ submit field 
    // √ submit button 
    // √ need clickeventlistener for submit button 
    // √ set value of form to variable
    // √ fetch post to users database
        // √ need post function 
        // √ :name = form variable
    // √ hide form after fetch post 

// after submit form click
    // generate game container 
        // √create generate game function 
        //  √   creates game container div 
        // √<tr><th>     use tables to format? or flexbox? 
        // √load 8 cells with src = card back constant 
        // √load middle cell with empty image or empty cell?
        // set each cell with ramen-id 
        // fetch get 4 ramen 
        // √    need to create an array with ramen choices (need 2 of each, total of 8)
        // √    need to shuffle array
        //     need function to grab from array and set cell with that choice 
        //         need to subtract that choice from array 
        // set gameMode to 4 (for 4 pairs) for normal mode
        
//guess incrementer
        //- need guess incrementer function
            // - increments after every pair of clicks
        // set guesses incrementer to 0
        // something parsint?
        // save increment to variable

// gameplay

// need current click variable (let currentChoice = 0)
// need pair counter to keep track of how many pairs have been matched (let ramenPair = 0)
//         need clickeventlistener for document 

//         //wrong choice
//             if click ramen-id doesn't equal currentChoice 
//             change target src to ramen-id src //flip image
//             reset currentChoice 
//             say 'Wrong, try again'
//             some timer to show wrong images for 1 second 
//                 need timer function? 
//             image src = cardback after 1 second
//             increment guess by 1

//         //right choice
//             else click src  === ramen-id = currentChoice 
//                 src === ramen-id src //flips image over
//                                     // Match! text popup
//                                     images stay flipped over
                                        // increment ramenPair by 1
//                                     increment guess by 1
//         //initial click
//             else click src === cardback src, then src === ramen-id src 
//             currentChoice = e.target ramen-id? 

    // game over logic
        // if ramenPair = gameMode 
        //     Congratulations, you solved this with ${guessesNumber}!
        //     show score list?
        //     new game button?

        //         new game button ==> generate game container function
