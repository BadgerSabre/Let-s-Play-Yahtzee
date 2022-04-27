// Variables
let board = []
let hand = []
let rollCount = 0
let sum = 0
let onesScore = 0
let twosScore = 0
let threesScore = 0
let foursScore = 0
let fivesScore = 0
let sixesScore = 0
let bonusPoints = 0
let upperSectionTotal = 0
let threeOfAKind = 0
let fourOfAKind = 0
let fullHouse = 0
let smallStraight = 0
let largeStraight = 0
let yahtzeeScore = 0
let chance = 0
let lowerSectionTotal = 0
let totalScore = 0

// Roll Die Function
function rollDie(){
    let value = Math.floor(Math.random() * 6) + 1;
    displayDie(value)
    return value
}

// Display Die and Add Style to Selected Die
function displayDie(value){
    let face = document.createElement('img')
    face.src = `../Media/Dice${value}.png`
    face.addEventListener('click', () => {
        if(face.style.border === '4px solid black') {
            face.style.border = ''
            hand.splice(hand.indexOf(value), 1)
        } else {
            face.style.border = '4px solid black'
            face.style.borderRadius = '5px'
            hand.push(value)
        }
        if(!hand.length) return
        hand.sort()
        sum = hand.reduce((a,b)=> a + b)
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
    rollCount++
    if(rollCount > 1){
        document.querySelector('#roll-again').disabled = true
    }
})

// Comparative Arrays Helper Function
function arrayEquals(hand, value) {
    return Array.isArray(hand) &&
    Array.isArray(value) &&
    hand.length === value.length &&
    hand.every((val, index) => val === value[index]);
}

// Find Duplicates Helper Function
function findDuplicates(hand) {
    let duplicates = hand.filter((item, index) => hand.indexOf(item) !== index)
    return duplicates
}

// Check 4 of a Kind
function checkFourOfAKind(hand) {
    let duplicates = findDuplicates(hand)
    if(duplicates.length >= 3) {
        fourOfAKind = sum
    }
    document.querySelector('#four-of-a-kind').textContent = fourOfAKind
    console.log(fourOfAKind)
    return fourOfAKind
}

document.querySelector('#four-of-a-kind').addEventListener('click', function displayFourOfAKind () {
    checkFourOfAKind(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#four-of-a-kind').removeEventListener('click', displayFourOfAKind)
    return fourOfAKind
})

// Check 3 of a Kind
function checkThreeOfAKind(hand) {
    let duplicates = findDuplicates(hand)
    if(duplicates.length >= 2) {
        threeOfAKind = sum
    }
    document.querySelector('#three-of-a-kind').textContent = threeOfAKind
    return threeOfAKind
}

document.querySelector('#three-of-a-kind').addEventListener('click', function displayThreeOfAKind () {
    checkThreeOfAKind(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#three-of-a-kind').removeEventListener('click', displayThreeOfAKind)
    return threeOfAKind
})

// Check Large Straight
function checkLargeStraight(hand) {
    let largeStraight1 = [1,2,3,4,5]
    let largeStraight2 = [2,3,4,5,6]
    if(arrayEquals(hand, largeStraight1) || arrayEquals(hand, largeStraight2)) {
        largeStraight = 40
    }
    document.querySelector('#LG-straight').textContent = largeStraight
    return largeStraight
}

document.querySelector('#LG-straight').addEventListener('click', function displayLargeStraight() {
    checkLargeStraight(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#LG-straight').removeEventListener('click', displayLargeStraight)
    return largeStraight
})

// Check Full House
function checkFullHouse(hand) {
    let arr1 = hand.filter(num => num === hand[0])
    let arr2 = hand.filter(num => num === hand[4])
    if(arr1.length === 2 && arr2.length === 3 || arr1.length === 3 && arr2.length === 2){
        fullHouse = 25
    }
    document.querySelector('#fullhouse').textContent = fullHouse
    return fullHouse
}

document.querySelector('#fullhouse').addEventListener('click', function displayFullHouse() {
    checkFullHouse(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#fullhouse').removeEventListener('click', displayFullHouse)
    return fullHouse
})

// Check Small Straight
function checkSmallStraight(hand) {
    if (hand.includes(1) && hand.includes(2) && hand.includes(3) && hand.includes(4)) {
        smallStraight = 30
    } else if (hand.includes(2) && hand.includes(3) && hand.includes(4) && hand.includes(5)) {
        smallStraight = 30
    } else if (hand.includes(3) && hand.includes(4) && hand.includes(5) && hand.includes(6)) {
        smallStraight = 30
    }
    document.querySelector('#SM-straight').textContent = smallStraight
    return smallStraight
}

document.querySelector('#SM-straight').addEventListener('click', function displaySmallStraight() {
    checkSmallStraight(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#SM-straight').removeEventListener('click', displaySmallStraight)
    return smallStraight
})

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
            yahtzeeScore = 50
        } 
        document.querySelector('#yahtzee').textContent = yahtzeeScore
        return yahtzeeScore
    })
}


document.querySelector('#yahtzee').addEventListener('click', function displayYahtzee() {
    checkYahtzee(hand)
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#yahtzee').removeEventListener('click', displayYahtzee)
    return yahtzeeScore
})

// Check Chance
document.querySelector('#chance').addEventListener('click', function displayChance () {
    chance = sum
    document.querySelector('#chance').textContent = chance
    updateLowerSection()
    updateTotalScore()
    document.querySelector('#chance').removeEventListener('click', displayChance)
    return chance
})

// Check and Score Ones
document.querySelector('#score-ones').addEventListener('click', function displayOnes() {
    hand.forEach(item => {
        if(item === 1){
            onesScore++
        }
    })
    document.querySelector('#score-ones').textContent = onesScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-ones').removeEventListener('click', displayOnes)
    return onesScore
})

// Check and Score Twos
document.querySelector('#score-twos').addEventListener('click', function displayTwos() {
    hand.forEach(item => {
        if(item === 2){
            twosScore = twosScore + 2
        }
    })
    document.querySelector('#score-twos').textContent = twosScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-twos').removeEventListener('click', displayTwos)
    return twosScore
})

// Check and Score Threes
document.querySelector('#score-threes').addEventListener('click', function displayThrees() {
    hand.forEach(item => {
        if(item === 3){
            threesScore = threesScore + 3
        }
    })
    document.querySelector('#score-threes').textContent = threesScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-threes').removeEventListener('click', displayThrees)
    return threesScore
})

// Check and Score Fours
document.querySelector('#score-fours').addEventListener('click', function displayFours() {
    hand.forEach(item => {
        if(item === 4){
            foursScore = foursScore + 4
        }
    })
    document.querySelector('#score-fours').textContent = foursScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-fours').removeEventListener('click', displayFours)
    return foursScore
})

// Check and Score Fives
document.querySelector('#score-fives').addEventListener('click', function displayFives() {
    hand.forEach(item => {
        if(item === 5){
            fivesScore = fivesScore + 5
        }
    })
    document.querySelector('#score-fives').textContent = fivesScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-fives').removeEventListener('click', displayFives)
    return fivesScore
})

// Check and Score Sixes
document.querySelector('#score-sixes').addEventListener('click', function displaySixes() {
    hand.forEach(item => {
        if(item === 6){
            sixesScore = sixesScore + 6
        }
    })
    document.querySelector('#score-sixes').textContent = sixesScore
    checkBonusPoints()
    updateUpperSection()
    updateTotalScore()
    document.querySelector('#score-sixes').removeEventListener('click', displaySixes)
    return sixesScore
})

// Check Bonus Points
function checkBonusPoints() {
    let upperSection = onesScore + twosScore + threesScore + foursScore + fivesScore + sixesScore
    if(upperSection >= 63){
        bonusPoints = 35
        document.querySelector('#bonus-points').textContent = bonusPoints
    } else {
        document.querySelector('#bonus-points').textContent = 0
    }
}

// Calculate Upper Section Total
function updateUpperSection() {
    let upperSectionTotal = onesScore + twosScore + threesScore + foursScore + fivesScore + sixesScore + bonusPoints
    document.querySelector('#upper-section-total').textContent = upperSectionTotal
    return upperSectionTotal
}

// Calculate Lower Section Total
function updateLowerSection() {
    let lowerSectionTotal = threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + yahtzeeScore + chance
    document.querySelector('#lower-section-total').textContent = lowerSectionTotal
    return lowerSectionTotal
}

// Calculate Total Score
function updateTotalScore() {
    let upperSectionTotal = onesScore + twosScore + threesScore + foursScore + fivesScore + sixesScore + bonusPoints
    let lowerSectionTotal = threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + yahtzeeScore + chance
    let totalScore = upperSectionTotal + lowerSectionTotal
    document.querySelector('#total-score').textContent = totalScore
    return totalScore
}

// Play Again Btn
document.querySelector('#play-again').addEventListener('click', () => {
    window.location.reload()
})
