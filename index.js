// console.log("ramen game")

const noodleUrl = 'http://localhost:3000/api/v1/noodles'
const userUrl = 'http://localhost:3000/api/v1/users'
const scoreUrl = 'http://localhost:3000/api/v1/scores'

const cardBack = 'https://i.imgur.com/fi8sccM.png'
const correctPair = 'https://i.imgur.com/qoRKqo9.png'
const wrongPair = 'https://i.imgur.com/xobKCZ8.png'

const formInput = document.querySelector("#userForm > p:nth-child(2) > input[type=text]")
const statusBox = document.getElementById("statusBox")
const userForm = document.getElementById("userForm")

const ramenCard = document.getElementsByClassName("ramen-card")
const statusCard = document.getElementById("status")
const ramenCell = document.getElementsByClassName("ramen-cell")
const guessNode = document.getElementById("guessBox")

let gamePairs = 0
let currentPairs = 0
let savedChoice = "" //save previous card name
let savedNode //save previous card node
let guessesNumber = 0
let userName = "" //saved form name
let currentUserId

// console.log(correctPair)
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

function correct(){
    statusCard.src = correctPair
    gamePairs + 1
}

function wrong(){
    statusCard.src = wrongPair
}

function guessIncrement(){
    guessesNumber = parseInt(guessNode.innerHTML) + 1
    guessNode.innerHTML = `${guessesNumber} Guesses`
}

let ramenOne = {
    "name": "ichiran",
    "imageUrl": "https://i.imgur.com/qEk4ZMF.png"
  }
let ramenTwo = {
    "name": "momosan",
    "imageUrl": "https://i.imgur.com/hLkrgOR.png"
  }
let ramenThree = {
    "name": "nakiryu",
    "imageUrl": "https://i.imgur.com/ExKxm2t.png"
  }

let ramenFour = {
    "name": "tsuta",
    "imageUrl": "https://i.imgur.com/azMJhCA.png"
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

function generateBoard(){

    let ramenShuffledArray = ramenArray

    shuffle(ramenShuffledArray)

// need to refactor into loop

    card1.src = cardBack
    card1.dataset.ramen = ramenShuffledArray[0].name
    card1.dataset.ramenurl = ramenShuffledArray[0].imageUrl

    card2.src = cardBack
    card2.dataset.ramen = ramenShuffledArray[1].name
    card2.dataset.ramenurl = ramenShuffledArray[1].imageUrl

    card3.src = cardBack
    card3.dataset.ramen = ramenShuffledArray[2].name
    card3.dataset.ramenurl = ramenShuffledArray[2].imageUrl

    card4.src = cardBack
    card4.dataset.ramen = ramenShuffledArray[3].name
    card4.dataset.ramenurl = ramenShuffledArray[3].imageUrl

    card5.src = cardBack
    card5.dataset.ramen = ramenShuffledArray[4].name
    card5.dataset.ramenurl = ramenShuffledArray[4].imageUrl

    card6.src = cardBack
    card6.dataset.ramen = ramenShuffledArray[5].name
    card6.dataset.ramenurl = ramenShuffledArray[5].imageUrl

    card7.src = cardBack
    card7.dataset.ramen = ramenShuffledArray[6].name
    card7.dataset.ramenurl = ramenShuffledArray[6].imageUrl

    card8.src = cardBack
    card8.dataset.ramen = ramenShuffledArray[7].name
    card8.dataset.ramenurl = ramenShuffledArray[7].imageUrl

    gamePairs = 4
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

    guessNode.innerHTML = "0 Guesses"
    statusBox.innerHTML = `Hi ${userName}, try to find all the pairs of ramen in the fewest guesses.`

    userForm.remove()

    generateBoard()

})

function flipCards(savedNode, e){
    setTimeout(function(){
        e.target.src = cardBack
        savedNode.src = cardBack
    }, 1000)

}

function saveUser(){
    console.log(`save user function with ${guessesNumber} guesses`)
    fetch(userUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
                name: userName,
                guesses: guessesNumber
            })

    })
        .then(response => response.json())
        .then(console.log)


    // fetch post to scores
    // .then get all scores
    // populate to ul
}

// need function if currentpairs === game pairs then game over
function gameOver(){

    if (currentPairs === gamePairs){
        console.log(`game over function with ${guessesNumber} guesses`)
        statusBox.innerHTML = `Congratulations ${userName}, you solved this with ${guessesNumber} guesses!`
        saveUser()
        //need function to show score list
    }
}

document.addEventListener('click', function(e){
//correct pair
console.log(currentPairs)
    if(e.target.src === cardBack && e.target.dataset.ramen === savedChoice ) {
        e.target.src = e.target.dataset.ramenurl
        // console.log('pair match click')
        //increment guessesNumber by 1
        savedChoice = "" //clear saved choice
        savedNode = "" //clear saved node

        currentPairs += 1

        guessIncrement()

        correct() //correct middle card

        gameOver()
//first flip
    } else if(e.target.src === cardBack && savedChoice === ""){
        e.target.src = e.target.dataset.ramenurl //flip
        savedChoice = e.target.dataset.ramen //save current ramen name
        savedNode = e.target //save current node
        statusCard.src = "" // clear statuscard

        // console.log ('first card pair click')

//wrong pair
    } else if(e.target.src === cardBack){
        e.target.src = e.target.dataset.ramenurl //flip
        
        // console.log('wrong pair click')

        flipCards(savedNode, e)     // flip both cards back TK x seconds

        guessIncrement() // increment guesses by 1

        // clear current choice
        savedChoice = ""
        savedNode = ""

        wrong() // wrong match card function

        }

})


// √ need name submit form 
    // √ submit field 
    // √ submit button 
    // √ need clickeventlistener for submit button 
    // √ set value of form to variable
    // √ fetch post to users database
        // √ need post function 
        // √ :name = form variable
    // √ hide form after fetch post 

// after submit form click
    //√ generate game container 
        // √create generate game function 
        //  √   creates game container div 
        // √<tr><th>     use tables to format? or flexbox? 
        // √load 8 cells with src = card back constant 
        // √load middle cell with empty image or empty cell?
        // √ set each cell with ramen-name
        // fetch get 4 ramen 
        // set first 4 ramen fetch to variables
        // √    need to create an array with ramen choices (need 2 of each, total of 8)
        // √    need to shuffle array
        // √    need function to grab from array and set cell with that choice 
        // √ set gameMode to 4 (for 4 pairs) for normal mode
        
//guess incrementer
        //- need guess incrementer function
            // - increments after every pair of clicks
        //√ set guesses incrementer to 0
        //√ something parsint?
        //√ save increment to variable

// gameplay

//√ need current click variable (let savedChoice = 0)
//√ need pair counter to keep track of how many pairs have been matched (let ramenPair = 0)
//√        need clickeventlistener for document 

//   √      //wrong choice
//             if click ramen-id doesn't equal savedChoice 
//             change target src to ramen-id src //flip image
//             reset savedChoice 
//             say 'Wrong, try again'
//             some timer to show wrong images for 1 second 
//                 need timer function? 
//             image src = cardback after 1 second
//             increment guess by 1

// √        //right choice
//             else click src  === ramen-id = savedChoice 
//                 src === ramen-id src //flips image over
//                                     // Match! text popup
//                                     images stay flipped over
                                        // increment ramenPair by 1
//                                     increment guess by 1
//         //initial click
//         √    else click src === cardback src, then src === ramen-id src 
//         √    savedChoice = e.target ramen-id? 

    // game over logic
        //√ if ramenPair = gameMode 
        // √    Congratulations, you solved this with ${guessesNumber}!
        //     show score list?
        //     new game button?

        //         new game button ==> generate game container function
