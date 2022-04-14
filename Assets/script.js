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
    let availableDice = hand.length - 5
})