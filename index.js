// BASE URLS
const noodleUrl = 'http://localhost:3000/api/v1/noodles'
const userUrl = 'http://localhost:3000/api/v1/users'
const scoreUrl = 'http://localhost:3000/api/v1/scores'

// CARD IMAGE ASSETS
const cardBack = 'https://i.imgur.com/SIjWIog.png'
const correctPair = 'https://i.imgur.com/BVfHpbD.png'
const wrongPair = 'https://i.imgur.com/7X0qBn4.png'

// FORM NODES
const formInput = document.querySelector("#userForm > p:nth-child(2) > input[type=text]")
const statusBox = document.getElementById("statusBox")
const userForm = document.getElementById("userForm")
const submitNode = document.querySelector("#userForm > input[type=submit]")

// CARD NODES
const ramenCard = document.getElementsByClassName("ramen-card")
const statusCard = document.getElementById("status")
const ramenCell = document.getElementsByClassName("ramen-cell")
const guessNode = document.getElementById("guessBox")

// INDIVIDUAL CARD NODES
const card1 = ramenCard[0]
const card2 = ramenCard[1]
const card3 = ramenCard[2]
const card4 = ramenCard[3]
const card5 = ramenCard[4]
const card6 = ramenCard[5]
const card7 = ramenCard[6]
const card8 = ramenCard[7]

// SCORE NODE
const scoreNode = document.getElementById("scoreList")
const ramenScoresNode = document.getElementById("ramen-scores")
const gameName = document.getElementById("gameName")

// VARIABLES FOR SAVING STATE
let gamePairs = 0
let currentPairs = 0
let savedChoice = "" //save previous card name
let savedNode //save previous card node
let guessesNumber = 0
let userName = "" //saved form name
let currentUserId
let gameMode = ""

// SET BOARD FUNCTIONS
function setRamen(){
    let ramenOne = {
        "name": "ichiran",
        "imageUrl": "https://i.imgur.com/WJD7d6E.png"
    }
    let ramenTwo = {
        "name": "momosan",
        "imageUrl": "https://i.imgur.com/wkflNA5.png"
    }
    let ramenThree = {
        "name": "nakiryu",
        "imageUrl": "https://i.imgur.com/VqPUrQy.png"
    }
    let ramenFour = {
        "name": "tsuta",
        "imageUrl": "https://i.imgur.com/xujYqVP.png"
    }

    let ramenArray = [ramenOne, ramenOne, ramenTwo, ramenTwo, ramenThree, ramenThree, ramenFour, ramenFour]

    generateBoard(ramenArray)
}

function setBeef(){
    let beefOne = {
        "name": "bel-campo",
        "imageUrl": "https://i.imgur.com/qpaz4TR.png"
    }
    let beefTwo = {
        "name": "au-cheval",
        "imageUrl": "https://i.imgur.com/zbMtbng.png"
    }
    let beefThree = {
        "name": "french-louie",
        "imageUrl": "https://i.imgur.com/wVuQgaB.png"
    }
    let beefFour = {
        "name": "coopers-nyc",
        "imageUrl": "https://i.imgur.com/L5wyP5v.png"
    }

    let beefArray = [beefOne, beefOne, beefTwo, beefTwo, beefThree, beefThree, beefFour, beefFour]

    generateBoard(beefArray)
}

// FISHER-YATES SHUFFLE ALGORITHM
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

function generateBoard(array){
    shuffle(array)
// need to refactor into loop
    card1.src = cardBack
    card1.dataset.name = array[0].name
    card1.dataset.url = array[0].imageUrl

    card2.src = cardBack
    card2.dataset.name = array[1].name
    card2.dataset.url = array[1].imageUrl

    card3.src = cardBack
    card3.dataset.name = array[2].name
    card3.dataset.url = array[2].imageUrl

    card4.src = cardBack
    card4.dataset.name = array[3].name
    card4.dataset.url = array[3].imageUrl

    card5.src = cardBack
    card5.dataset.name = array[4].name
    card5.dataset.url = array[4].imageUrl

    card6.src = cardBack
    card6.dataset.name = array[5].name
    card6.dataset.url = array[5].imageUrl

    card7.src = cardBack
    card7.dataset.name = array[6].name
    card7.dataset.url = array[6].imageUrl

    card8.src = cardBack
    card8.dataset.name = array[7].name
    card8.dataset.url = array[7].imageUrl

    gamePairs = 4
}

// GAMEPLAY HELPER FUNCTIONS
function correct(){
    statusCard.src = correctPair
    gamePairs + 1
}

function wrong(){
    statusCard.src = wrongPair
}

function guessIncrement(){
    if (gameMode === "burgers" ){
        guessesNumber = parseInt(guessNode.innerHTML) + 1
        guessNode.innerHTML = `${guessesNumber} Moooves`

    } else if (gameMode === "ramen"){
    guessesNumber = parseInt(guessNode.innerHTML) + 1
    guessNode.innerHTML = `${guessesNumber} Moves`
    }
}

function flipCards(savedNode, e){
    setTimeout(function(){
        e.target.src = cardBack
        savedNode.src = cardBack
    }, 1000)

}

function gameOver(){
    if (currentPairs === gamePairs){
        statusBox.innerHTML = `Congratulations ${userName}, you matched all the pairs of ${gameMode}!`
        saveUser()
        getUsers()
    }
}

function saveUser(){
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
    // .then(getUsers())
}

// RENDER USER HELPER FUNCTIONS
function createUserLi(userObject){
    const userLi = document.createElement('li')
    userLi.className = 'user-score'
    userLi.dataset.id = userObject.id

    userLi.innerHTML = `
    <h4>${userObject.guesses} moves........${userObject.name}</h4>
    `
    return userLi
}

function renderUser(userObject){
    const userLi = createUserLi(userObject)
    scoreNode.append(userLi)
}

function renderUsers(users){
    ramenScoresNode.innerHTML = 'Scoreboard'
    users.forEach(function(userObject){
        renderUser(userObject)
    })
}

function getUsers(){
    fetch(userUrl)
    .then(response => response.json())
    .then(users => {
        renderUsers(users)
    })
}

// EVENT LISTENERS
document.addEventListener('submit', function(e){
    e.preventDefault()

    if(formInput.value==='beef'){
        userName = formInput.value

        gameName.innerHTML = 'THERE IS NO COW LEVEL'
        guessNode.innerHTML = "0 Moooves"
        statusBox.innerHTML = `Hi ${userName}, try to find all the pairs of burgers in the fewest moooves.`
        userForm.remove()
        gameMode = "burgers"

        setBeef()
    }

    else if(formInput.value){
        userName = formInput.value

        guessNode.innerHTML = "0 Moves"
        statusBox.innerHTML = `Hi ${userName}, try to find all the pairs of ramen in the fewest moves.`
        userForm.remove()
        gameMode = "ramen"

        setRamen()
    }
})

document.addEventListener('click', function(e){
//CORRECT PAIR
// console.log(currentPairs)
    if(e.target.src === cardBack && e.target.dataset.name === savedChoice ) {
        e.target.src = e.target.dataset.url //flip
        // console.log('pair match click')
        savedChoice = "" //clear saved choice
        savedNode = "" //clear saved node
        currentPairs += 1 //complete pair counter

        guessIncrement() //increment moves +1

        correct() //correct middle card

        gameOver() //end game conditional
//FIRST CARD FLIP
    } else if(e.target.src === cardBack && savedChoice === ""){
        // console.log ('first card pair click')
        e.target.src = e.target.dataset.url //flip
        savedChoice = e.target.dataset.name //save current ramen name
        savedNode = e.target //save current node
        statusCard.src = "" // clear statuscard

//WRONG PAIR
    } else if(e.target.src === cardBack){
        e.target.src = e.target.dataset.url //flip
        // console.log('wrong pair click')

        flipCards(savedNode, e) // flip both cards back in 1 second

        savedChoice = "" //clear saved choice
        savedNode = "" //clear saved node

        guessIncrement() // increment moves +1

        wrong() // wrong match card function
        }
})

// PSEUDOCODE ROADMAP

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
