// Variables
let board = []
let hand = []
let rollCount = 0
let sum = 0

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
        // console.log(hand)
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
    rollCount++
    if(rollCount > 1){
        document.querySelector('#roll-again').disabled = true
    }
    console.log(rollCount)
})

// Check Score Button
document.querySelector('#score-points').addEventListener('click', ()=>{
    checkLargeStraight(hand)
})

function arrayEquals(hand, largeStraight) {
    return Array.isArray(hand) &&
        Array.isArray(largeStraight) &&
        hand.length === largeStraight.length &&
        hand.every((val, index) => val === largeStraight[index]);
}

function checkLargeStraight(hand){
    let largeStraight1 = [1,2,3,4,5]
    let largeStraight2 = [2,3,4,5,6]
    if(arrayEquals(hand, largeStraight1) || arrayEquals(hand, largeStraight2)) {
        console.log('You win')
    }
}

// if(i = i++){
    
// }

// if(hand = [1,2,3,4,5] || [2,3,4,5,6]){
    
// }