let startingHand = []
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
        face.style.border = '1px solid red'
    })
    document.querySelector('#content').appendChild(face)
}

document.querySelector('#start-game').addEventListener('click', () => {
    document.querySelector('#content').innerHTML = ''
    startingHand = []
    for(let i = 0; i < 5; i++){
        let value = rollDie()
        startingHand.push(value)
    }
    console.log(startingHand)
})