import { woorden } from './constants.js'


const startButton = document.getElementById('start-button');
const divInputFields = document.getElementById('input-fields');
const submitButton = document.querySelector('.submit-button')

const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const name3 = document.getElementById('name3');
const name4 = document.getElementById('name4');
const name5 = document.getElementById('name5');
const name6 = document.getElementById('name6');
const name7 = document.getElementById('name7');
const name8 = document.getElementById('name8');
const name9 = document.getElementById('name9');
const name10 = document.getElementById('name10');

let players = [];

let name1Value = '';
let name2Value = '';
let name3Value = '';
let name4Value = '';
let name5Value = '';
let name6Value = '';
let name7Value = '';
let name8Value = '';
let name9Value = '';
let name10Value = '';

const infoH1 = document.getElementById('info')
const playerNow = document.getElementById('player-now')
const showHideButton = document.getElementById('show-hide-button')
const nextPlayerButton = document.getElementById('next-player-button')

startButton.addEventListener('click', start)

function start() {
    setTimeout(function() {
        startButton.style.display = 'none'
        divInputFields.style.display = 'inline-block'
        submitButton.addEventListener('click', submit)
    }, 1200)
}

let amount_of_players = 0
let number_imposter = 0
let full_word = []
let keyword = ''
let hint = ''

function submit() {
    setTimeout(function() {
        players = [];
        amount_of_players = 0;
       
        if (name1.value.trim() !== '') {
            name1Value = name1.value;
            players.push(name1Value);
            amount_of_players++;
        }
        if (name2.value.trim() !== '') {
            name2Value = name2.value;
            players.push(name2Value);
            amount_of_players++;
        }
        if (name3.value.trim() !== '') {
            name3Value = name3.value;
            players.push(name3Value);
            amount_of_players++;
        }
        if (name4.value.trim() !== '') {
            name4Value = name4.value;
            players.push(name4Value);
            amount_of_players++;
        }
        if (name5.value.trim() !== '') {
            name5Value = name5.value;
            players.push(name5Value);
            amount_of_players++;
        }
        if (name6.value.trim() !== '') {
            name6Value = name6.value;
            players.push(name6Value);
            amount_of_players++;
        }
        if (name7.value.trim() !== '') {
            name7Value = name7.value;
            players.push(name7Value);
            amount_of_players++;
        }
        if (name8.value.trim() !== '') {
            name8Value = name8.value;
            players.push(name8Value);
            amount_of_players++;
        }
        if (name9.value.trim() !== '') {
            name9Value = name9.value;
            players.push(name9Value);
            amount_of_players++;
        }
        if (name10.value.trim() !== '') {
            name10Value = name10.value;
            players.push(name10Value);
            amount_of_players++;
        }

        shuffle(players)

        divInputFields.style.display = 'none'
        showHideButton.style.display = 'inline-block'
        nextPlayerButton.style.display = 'block'
        nextPlayerButton.innerHTML = `Volgende: ${players[0]}`

        full_word = getRandomItem(woorden)
        keyword = full_word.key
        hint = full_word.value

        number_imposter = randomIntFromInterval(amount_of_players)
        // console.log("Total players:", amount_of_players);
        // console.log("Imposter index:", number_imposter);
        // console.log("Players:", players);
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
        infoH1.innerHTML = `${players[beginPlayer]} mag beginnen!`
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
    nextPlayerButton.innerHTML = `Volgende: ${players[in_move]}`
    playerNow.innerHTML = `Nu aan het kijken: ${players[in_move - 1]}`
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
    infoH1.innerHTML = `${players[number_imposter - 1]} is the IMPOSTER!`
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

