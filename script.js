import { woorden } from './constants.js'


const startButton = document.getElementById('start-button');
const divInputFields = document.getElementById('input-fields');
const submitButton = document.querySelector('.submit-button');
const numberInput = document.getElementById('number-input');

const infoH1 = document.getElementById('info')
const playerNow = document.getElementById('player-now')
const showHideButton = document.getElementById('show-hide-button')
const nextPlayerButton = document.getElementById('next-player-button')

startButton.addEventListener('click', start)
submitButton.addEventListener('click', submit)

function start() {
    if (numberInput.value > 0) {
        setTimeout(function() {
        startButton.innerHTML = 'Restart'
        divInputFields.innerHTML = ''
        divInputFields.style.display = 'inline-block'
        submitButton.style.display = 'block'

        let index = 1

        while (index - 1 != numberInput.value) {
            const el = document.createElement('input')
            el.type = 'text'
            el.name =  `name${index}`
            el.id = `name${index}`
            el.classList.add(`textInput`)
            const labEl = document.createElement('label')
            labEl.setAttribute('for', `name${index}`)
            labEl.innerHTML = `Player ${index}:`
            index ++
            divInputFields.appendChild(labEl)
            divInputFields.appendChild(el)
        }
    }, 1200)
    }
}

let amount_of_players = 0
let number_imposter = 0
let full_word = []
let keyword = ''
let hint = ''
let playerValues = []
let playerBetweenValues = []

function submit() {
    setTimeout(function() {
        let players = document.querySelectorAll('.textInput').forEach(el => {
            if (el) {
                playerBetweenValues.push(el)
            }
        })

        playerBetweenValues.forEach(player => {
            if (player.value) {
                console.log(player.value)
                playerValues.push(player.value)
            }
        })

        amount_of_players = playerValues.length;
       

        shuffle(playerValues)

        divInputFields.style.display = 'none'
        startButton.style.display = 'none'
        submitButton.style.display = 'none'
        numberInput.style.display = 'none'
        showHideButton.style.display = 'inline-block'
        nextPlayerButton.style.display = 'block'
        nextPlayerButton.innerHTML = `Volgende: ${playerValues[0]}`

        full_word = getRandomItem(woorden)
        keyword = full_word.key
        hint = full_word.value

        number_imposter = randomIntFromInterval(amount_of_players)
        // console.log("Total players:", amount_of_players);
        // console.log("Imposter index:", number_imposter);
        // console.log("Players:", playerValues);
        // console.log("Keyword:", keyword);
        // console.log("Hint:", hint);
        changeButtonText();

        showHideButton.addEventListener('click', showhide)
    }, 800)
}
let temp = 1


function showhide() {
    let hidden = true

    if (temp <= amount_of_players) {

        if (showHideButton.innerHTML == 'SHOW') {
            showHideButton.innerHTML = 'HIDE'
            hidden = false
        } else if (showHideButton.innerHTML == 'HIDE') {
            showHideButton.innerHTML = 'SHOW'
            hidden = true
        }


        if (temp == number_imposter) {
            infoH1.innerHTML = `!IMPOSTER! De tip is: ${hint}`
            if (hidden) {
                infoH1.style.display = 'none'
            } else {
                infoH1.style.display = 'block'
            }
        } else {
            infoH1.innerHTML = `Het woord is: ${keyword}`
            if (hidden) {
                infoH1.style.display = 'none'
            } else {
                infoH1.style.display = 'block'
            }
        }
    } else if (temp >= amount_of_players - 1) {
        nextPlayerButton.innerHTML = 'Start The Game!'
    } else if (temp >= amount_of_players) {
        showHideButton.style.display = 'none'
    }
}

let clicked = false

nextPlayerButton.addEventListener('click', () => {
    changeButtonText()
    
    if (temp >= amount_of_players - 1) {
        nextPlayerButton.innerHTML = 'Start The Game!'
    } else if (temp >= amount_of_players) {
        showHideButton.style.display = 'none'
    }

    temp ++
    infoH1.style.display = 'none'
    showHideButton.innerHTML = 'SHOW'


    if (nextPlayerButton.innerHTML == 'Start The Game!' && clicked == true) {
        nextPlayerButton.style.display = 'none'
        showHideButton.style.display = 'none'
        let beginPlayer = randomIntFromInterval(amount_of_players) - 1
        infoH1.innerHTML = `${playerValues[beginPlayer]} mag beginnen!`
        playerNow.style.display = 'none'
        infoH1.style.display = 'block'

        setTimeout(() => {
            revealButton.style.display = 'block'
        }, 5000);
    }

    if (nextPlayerButton.innerHTML == 'Start The Game!') {
        clicked = true
    }


})
let in_move = 1;
function changeButtonText() {
    nextPlayerButton.innerHTML = `Volgende: ${playerValues[in_move]}`
    playerNow.innerHTML = `Nu aan het kijken: ${playerValues[in_move - 1]}`
    in_move ++
}


function getRandomItem(obj) {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { key: randomKey, value: obj[randomKey] };
}

function randomIntFromInterval(max) { 
  return Math.floor(Math.random() * max + 1);
}

const revealButton = document.getElementById('reveal')
revealButton.addEventListener('click', revealTheImposter)

function revealTheImposter() {
    infoH1.innerHTML = `${playerValues[number_imposter - 1]} is the IMPOSTER!`
}

// Credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

