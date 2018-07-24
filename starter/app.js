/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let dice;
let scores, roundScore;
let gamePlaying = true;
init();

let lastDice;
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        let dice = Math.floor(Math.random() * 6) + 1;
        // display the dice
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice === 6 && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }

        lastDice = dice;
    }
});

//  update if the roll is a 1
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // add curent score to global score
        scores[activePlayer] += roundScore;
        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // check if player won the game
        let input = document.querySelector('.final-score').value;
        let winningScore;

        if (input > 0) {
            winningScore = input;
        } else {
            winningScore = 50;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';

        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1!";
    document.getElementById('name-1').textContent = "Player 2!";

    document.querySelector('.btn-roll').style.display = 'inline';
    document.querySelector('.btn-hold').style.display = 'inline';
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')
}
