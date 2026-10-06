// Name: Graciela Gozum
// Section: WD-303

const coffeeList = document.querySelector('#coffee-list');
const coffeeMessage = document.querySelector('#coffee-message');
const coffeeSearch = document.querySelector('#coffee-search');
const searchInput = document.querySelector('#search-input');
const clearSearch = document.querySelector('#clear-search');

function createCoffeeCard(coffee) {
	return `
		<article class="coffee-card">
			<img src="${coffee.src || coffee.image}" alt="${coffee.name}">
			<div class="coffee-card-content">
				<h3>${coffee.name}</h3>
				<p>${coffee.description}</p>
				<strong>₱${coffee.price}</strong>
			</div>
		</article>
	`;
}

function displayCoffees(coffees) {
	if (coffees.length === 0) {
		coffeeList.innerHTML = '';
		coffeeMessage.textContent = 'No coffee matched your search.';
		return;
	}

	coffeeMessage.textContent = `${coffees.length} coffee item(s) found.`;
	coffeeList.innerHTML = coffees.map(createCoffeeCard).join('');
}

function loadCoffees(url) {
	fetch(url)
		.then(response => response.json())
		.then(displayCoffees)
		.catch(() => {
			coffeeMessage.textContent = 'The menu could not be loaded right now.';
		});
}

loadCoffees('/api/coffees');


coffeeSearch.addEventListener('submit', event => {
	event.preventDefault();
	const searchTerm = searchInput.value.trim();

	if (!searchTerm) {
		coffeeMessage.textContent = 'Please enter a coffee name to search.';
		return;
	}

	coffeeMessage.textContent = `Searching for "${searchTerm}"...`;
	loadCoffees(`/search?q=${encodeURIComponent(searchTerm)}`);
});

clearSearch.addEventListener('click', () => {
	searchInput.value = '';
	coffeeMessage.textContent = 'Loading the full menu...';

	loadCoffees('/api/coffees');
});

