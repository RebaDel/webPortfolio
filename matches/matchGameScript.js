//cards objects in an array with links to their images
var cardsArray = [
	{	'name': 'Beach', 	'img': 'images/BeachSunrise8x10.jpg',			},
	{	'name': 'Flowers', 	'img': 'images/BlueFlowers8x10.jpg',			},
	{	'name': 'Blue', 	'img': 'images/BlueSunrise8x10.jpg',			},
	{	'name': 'Blossoms', 'img': 'images/CherryBlossoms8x10.jpg',			},
	{	'name': 'Colors', 	'img': 'images/ColorsofSunset8x10.jpg',			},
	{	'name': 'Duck', 	'img': 'images/DuckTakingFlight8x10.jpg',		},
	{	'name': 'Path', 	'img': 'images/LetchworthPath8x10.jpg',			},
	{	'name': 'Lilipads', 'img': 'images/LilipadsandRipples8x10.jpg',		},
	{	'name': 'Peeking', 	'img': 'images/PeekingatLetchworthGorge8x10.jpg',},
	{	'name': 'Iris', 	'img': 'images/PurpleYellowIris8x10.jpg',		},
	{	'name': 'Leaves', 	'img': 'images/RedLeaves8x10.jpg',				},
	{	'name': 'Waterfall', 'img': 'images/RoseWaterFall8x10.jpg',			},
];
//Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

//random display
gameGrid.sort(function() {
	return 0.5 - Math.random();
});

//Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');

//Create a section element and assign it to variable grid
var grid = document.createElement('section');

//Give section element a class of grid.
grid.setAttribute('class', 'grid');

//Append the grid section to the game-board div
game.appendChild(grid);

//Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++){
	//create a div element and assign to variable card
	let card = document.createElement('div');
	//apply a card class to that div
	card.classList.add('card');
	//set the data-name attribute of the div to the cardsArray name
	card.dataset.name = gameGrid[i].name;
	
	//create front of card
	var front = document.createElement('div');
	front.classList.add('front');
	
	//create back of card
	var back = document.createElement('div');
	back.classList.add('back');
	back.style.backgroundImage = `url(${gameGrid[i].img})`;
	
	//append card to grid
	grid.appendChild(card);
	card.appendChild(front);
	card.appendChild(back);
}

//create guess variables
var firstGuess = '';
var secondGuess = '';

//set count to 0
var count = 0;
var previousTarget = null;
var delay = 1500;

//add match CSS
var match = function() { 
	var selected = document.querySelectorAll('.selected');
	// loop through the array like object containing 'selected' class
	for (i = 0; i < selected.length; i++) {
		selected[i].classList.add('match');
	}
}

//Reset guesses after 2 attempts (function)
var resetGuesses = function() {
	firstGuess = '';
	secondGuess = '';
	count = 0;
	previousTarget = null;
	
	var selected = document.querySelectorAll('.selected');
	for(i = 0; i < selected.length; i++){
		selected[i].classList.remove('selected');
	}
	
};

//Add event listener to grid
grid.addEventListener('click',function(event) {
	//declare variable to target our clicked item
	var clicked = event.target;
	//do not allow the grid section itself to be selected;
	//only select divs inside the grid
	if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
		return;
	}
	//we only apply selected class if current count < 2 
	if (count < 2) {
		count++;
		
		if (count ===1) {
			//assign first guess
			firstGuess = clicked.parentNode.dataset.name;
			//add selected class 
			clicked.parentNode.classList.add('selected');
		} else {
			//assign second guess
			secondGuess = clicked.parentNode.dataset.name;
			//add selected class to this one too
			clicked.parentNode.classList.add('selected');
		}
		//make sure they aren't empty
		if (firstGuess !== '' && secondGuess !== ''){
			//and the firstGuess matches the secondGuess
			if (firstGuess === secondGuess) {
				//run the match function
				setTimeout(match, delay);
				setTimeout(resetGuesses, delay);
			} else {
				setTimeout(resetGuesses, delay);
			}
		}
		previousTarget = clicked;
	}
}); 


