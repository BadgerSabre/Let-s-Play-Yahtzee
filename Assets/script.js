// Variables
let board = []
let hand = []
let rollCount = 0
let sum = 0
let playerScore = 0

const scoreCardUpperSection = [
    {
        name: 'Ones',
        value: ''
    },
    {
        name: 'Twos',
        value: ''
    },
    {
        name: 'Threes',
        value: ''
    },
    {
        name: 'Fours',
        value: ''
    },
    {
        name: 'Fives',
        value: ''
    },
    {
        name: 'Sixes',
        value: ''
    },
    {
        name: 'Bonus',
        value: 35
    }
]

const scoreCardLowerSection = [
    {
        name: 'Fullhouse',
        value: 25
    },
    {
        name: 'Yahtzee',
        value: 50
    },
    {
        name: 'Large Staight',
        value: 40
    },
    {
        name: 'Small Straight',
        value: 30
    },
    {
        name: 'Full House',
        value: 25
    }
]

const availableHands = []

const selectedHands = []

// Roll Die Function
function rollDie(){
    let value = Math.floor(Math.random() * 6) + 1;
    displayDie(value)
    return value
}

// Display Die and Add Style to Selected Die
function displayDie(value){
    let face = document.createElement('img')
    face.src = `../images/Dice${value}.png`
    face.addEventListener('click', () => {
        if(face.style.border === '1px solid red') {
            face.style.border = ''
            hand.splice(hand.indexOf(value), 1)
        } else {
            face.style.border = '1px solid red'
            hand.push(value)
        }
        hand.sort()
        console.log(hand)
        const sum = hand.reduce((a,b)=> a + b)
        console.log(sum)
        return sum
    })
    document.querySelector('#content').appendChild(face)
}

// Clears Unclaimed Die After Roll Again
function clearBoard(){
    let faces = document.querySelectorAll('img')
    faces.forEach((face)=>{
        if(face.style.border === ''){
            face.remove()
        }
    })
}

// First Roll Button
document.querySelector('#first-roll').addEventListener('click', () => {
    document.querySelector('#content').innerHTML = ''
    board = []
    hand = []
    rollCount = 0
    for(let i = 0; i < 5; i++){
        let value = rollDie()
        board.push(value)
    }
    console.log(board)
    document.querySelector('#roll-again').disabled = false
})

// Roll Again Button
document.querySelector('#roll-again').addEventListener('click', ()=>{
    board = []
    clearBoard()
    for(let i = 0; i < 5 - hand.length; i++){
        let value = rollDie()
        board.push(value)
    }
    console.log(board)
    // rollCount++
    if(rollCount > 1){
        document.querySelector('#roll-again').disabled = true
    }
    console.log(rollCount)
})

// Check Score Button
document.querySelector('#score-points').addEventListener('click', ()=>{
    checkLargeStraight(hand)
    checkFullHouse(hand)
    checkSmallStraight(hand)
    checkYahtzee(hand)
})

// Comparative Arrays Helper Function
function arrayEquals(hand, value) {
    return Array.isArray(hand) &&
    Array.isArray(value) &&
    hand.length === value.length &&
    hand.every((val, index) => val === value[index]);
}

// Check Large Straight
function checkLargeStraight(hand) {
    let largeStraight1 = [1,2,3,4,5]
    let largeStraight2 = [2,3,4,5,6]
    if(arrayEquals(hand, largeStraight1) || arrayEquals(hand, largeStraight2)) {
        console.log('You got a Large Straight')
    }
}

// Check Full House
function checkFullHouse(hand) {
    let arr1 = hand.filter(num => num === hand[0])
    let arr2 = hand.filter(num => num === hand[4])
    if(arr1.length === 2 && arr2.length === 3 || arr1.length === 3 && arr2.length === 2){
        console.log('You got a Full House')
    }
}

// Check Small Straight
function checkSmallStraight(hand) {
    if (hand.includes(1) && hand.includes(2) && hand.includes(3) && hand.includes(4)) {
        console.log('You got a Small Straight')
    } else if (hand.includes(2) && hand.includes(3) && hand.includes(4) && hand.includes(5)) {
        console.log('You got a Small Straight')
    } else if (hand.includes(3) && hand.includes(4) && hand.includes(5) && hand.includes(6)) {
        console.log('You got a Small Straight')
    }
}

// Check Yahtzee
function checkYahtzee(hand) {
    let yahtzees = [
        [1,1,1,1,1],
        [2,2,2,2,2],
        [3,3,3,3,3],
        [4,4,4,4,4],
        [5,5,5,5,5],
        [6,6,6,6,6]
    ]
    yahtzees.forEach(yahtzee => {
        if(arrayEquals(hand, yahtzee)){
            console.log('You got a Yahtzee')
        }
    })
}