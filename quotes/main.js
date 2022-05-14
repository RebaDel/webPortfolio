var endpoint = 'https://labs.bible.org/api/?passage=random&type=json';
function getQuote() {
	fetch(endpoint)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			displayQuote(data[0]['text'] + ' ' + data[0].bookname + ' ' + data[0].chapter + ':' + data[0].verse);
		})
		.catch(function () {
			console.log("An error occurred");
		});
}
function displayQuote(quote) {
	var quoteText = document.querySelector('.quote-text');
	quoteText.textContent = quote;
}
var newQuoteButton = document.querySelector('.new-quote');
newQuoteButton.addEventListener('click', getQuote);
getQuote();