let board = []
let hand = []

function rollDie(){
    let value = Math.floor(Math.random() * 6) + 1;
    displayDie(value)
    return value
}

function displayDie(value){
    let face = document.createElement('img')
    face.src = `../images/Dice${value}.png`
    face.addEventListener('click', () => {
        if(face.style.border === '1px solid red') {
            face.style.border = ''
            hand.pop()
            console.log(hand)
            // hand.splice(value, hand.length)
        } else {
            face.style.border = '1px solid red'
            hand.push(value)
            console.log(hand)
        }
    })
    document.querySelector('#content').appendChild(face)
}

function clearBoard(){
    let face = document.querySelector('img')
    // face.src = `../images/Dice${value}.png`
    if(face.style.border === ''){
        face.remove()
    }
}

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

document.querySelector('#roll-again').addEventListener('click', ()=>{
    // let availableDice = 5 - hand.length
    board = []
    clearBoard()
    for(let i = 0; i < 5 - hand.length; i++){
        let value = rollDie()
        board.push(value)
    }
    console.log(board)
})