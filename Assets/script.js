// Variables
let board = []
let hand = []

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
    })
    document.querySelector('#content').appendChild(face)
}

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
    for(let i = 0; i < 5; i++){
        let value = rollDie()
        board.push(value)
    }
    console.log(board)
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
})


// if(i = i++){
    
// }

// if(hand = [1,2,3,4,5] || [2,3,4,5,6]){
    
// }