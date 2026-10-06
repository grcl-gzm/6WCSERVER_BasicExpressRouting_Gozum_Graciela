// Name: Graciela Gozum
// Section: WD-303

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const coffees = [
	{ id: 1, name: 'Matcha Coffee', description: 'Earthy matcha blended with smooth creamy coffee.', price: 150, src: '/images/coffee-matcha.jpg' },
	{ id: 2, name: 'Tiramisu Latte', description: 'Smooth espresso and steamed milk with rich tiramisu flavor and cocoa.', price: 205, src: '/images/tiramisu-latte.jpg' },
	{ id: 3, name: 'Mocha', description: 'Rich espresso, chocolate, and steamed milk finished with cocoa.', price: 165, src: '/images/mocha.jpg' },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'pages', 'index.html'));
	console.log("Rendering index.html");
});

app.get('/menu', (req, res) => {
	res.sendFile(path.join(__dirname, 'pages', 'menu.html'));
	console.log("Rendering menu.html");
});

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'pages', 'about.html'));
	console.log("Rendering about.html");
});

app.get('/contact', (req, res) => {
	res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
	console.log("Rendering contact.html");
});

app.get('/api/coffees', (req, res) => {
	res.json(coffees);
});

app.get('/coffee/:id', (req, res) => {
	const coffee = coffees.find(item => item.id === Number(req.params.id));

	if (!coffee) {
		return res.status(404).json({ error: 'Coffee not found.' });
	}

	res.json(coffee);
});

app.get('/search', (req, res) => {
	const searchTerm = req.query.q;

	if (!searchTerm) {
		return res.status(400).json({ error: 'Please provide a search term using ?q=.' });
	}

	const results = coffees.filter(coffee =>
		coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	res.json(results);
});

app.use((req, res) => {
	res.status(404).send('404 Not Found - The page or route does not exist.');
});

app.listen(port, () => {
	console.log(`Kape101 is running at http://localhost:${port}`);
});