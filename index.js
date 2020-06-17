// console.log("ramen game")

const noodleUrl = 'http://localhost:3000/api/v1/noodles'
const userUrl = 'http://localhost:3000/api/v1/users'
const scoreUrl = 'http://localhost:3000/api/v1/scores'

const cardBack = 'https://i.imgur.com/fi8sccM.png'
const formInput = document.querySelector("#userForm > p:nth-child(2) > input[type=text]")
const statusBox = document.getElementById("statusBox")
const userForm = document.getElementById("userForm")
const ramenCard = document.getElementsByClassName("ramen-card")
const ramenCell = document.getElementsByClassName("ramen-cell")
const guessNode = document.getElementById("guessBox")

let gamePairs = 0
let currentChoice = ""
let guessesNumber

console.log(guessNode)
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

document.addEventListener('click', function(e){
//correct pair
    if(e.target.dataset.ramen === currentChoice) {
        e.target.src = e.target.dataset.ramenurl
        console.log('click')
        console.log(currentChoice)
        //increment guessesNumber by 1
        //clear current choice
        //refactor guesses into function later
        guessesNumber = parseInt(guessNode.innerHTML) + 1
        guessNode.innerHTML = `${guessesNumber} Guesses`
//wrong pair
// need conditional logic to flip second choice in wrong pair
  } else if (e.target.dataset.ramen != currentChoice){

    console.log('this is the wrong pair')

// flip chosen ramen

//flip both cards to cardback after x seconds
// increment guesses by 1
// clear current choice



//first flip
    } else if(e.target.src === cardBack){
        e.target.src = e.target.dataset.ramenurl //flip
        currentChoice = e.target.dataset.ramen
        // console.log (currentChoice)
        //nest another else if

    }


    // if(e.target.dataset.ramen)
    // console.log(e.target.dataset.ramen)




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
//         √    else click src === cardback src, then src === ramen-id src 
//         √    currentChoice = e.target ramen-id? 

    // game over logic
        // if ramenPair = gameMode 
        //     Congratulations, you solved this with ${guessesNumber}!
        //     show score list?
        //     new game button?

        //         new game button ==> generate game container function
