const grid = document.querySelector('#grid');

const cards = ['pans', 'bi', 'trans', 'lesb', 'mlm', 'ace'];
const deck = [...cards, ...cards];
const errorCounter=document.querySelector('#error');

let pick = [];
let errors=0;

//random sort
deck.sort(function() {
	return 0.5-Math.random();
});
console.table(deck);
//const e let hanno visibilità solo nel blocco in cui sono creati, cioè tra {}
//però i blocchi possono vedere le variabili fuori di essi
for (var i = 0; i < deck.length; i++) {
	const card = document.createElement('div');
	const cardName=deck[i];
	card.classList.add('card');
	//data-* serve per dare attributi aggiuntivi
	card.setAttribute('data-name', cardName);
	card.addEventListener('click', flipCard);

	grid.appendChild(card);
}

errorCounter.innerText=errors;

function flipCard(event) {
	const card = event.target;
	if (card.classList.contains('flipped')) return;
	//aggiungo due nuova classi alla carta, quella salvata in data-name e 'flipped'
	card.classList.add(card.getAttribute('data-name'), 'flipped');
	pick.push(card);
	
	if(pick.length===2) {
		//check for match
		//non serve passare pick perchè lo vede (classe "globale")
		checkForMatch();
	}

    checkForWin()
}

function checkForMatch() {
	const card1=pick[0];
	const card2=pick[1];
	const card1Name=card1.getAttribute('data-name');
	const card2Name=card2.getAttribute('data-name');

	if (card1Name===card2Name) {
		console.log('Match found!');

	} else {
		console.log('No match found');
		setTimeout(function() {
			card1.classList.remove(card1Name, 'flipped');
			card2.classList.remove(card2Name, 'flipped');
			errors++;
			errorCounter.innerText=errors;
		}, 500);
		
	}

	pick = [];
}

function checkForWin() {
	const flippedCards = document.querySelectorAll('.flipped');
	if (flippedCards.length===deck.length) {
		showAlert('You won!');

	}
}