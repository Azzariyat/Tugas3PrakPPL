const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Route dasar untuk cek apakah server berjalan
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Tambahkan route contoh yang bisa menyebabkan error
app.get('/error', (req, res) => {
    throw new Error('Contoh error!');
});

// Middleware error handler harus ada di bagian paling bawah
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});


// Sample data
let characters = [
    {
        id: 1,
        name: "Naruto Uzumaki",
        anime: "Naruto",
        power: "Nine-Tails Chakra"
    },
    {
        id: 2,
        name: "Monkey D. Luffy",
        anime: "One Piece", 
        power: "Gum-Gum Devil Fruit"
    }
];

// GET all characters
app.get('/characters', (req, res) => {
    res.json({
        data: characters
    });
});

// Replace your existing search route

app.get('/characters/search', (req, res) => {
    const { name, anime, power, sort, limit } = req.query;
    let results = [...characters];
    
    // Apply filters
    if (name) {
        results = results.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (anime) {
        results = results.filter(c => c.anime.toLowerCase().includes(anime.toLowerCase()));
    }
    if (power) {
        results = results.filter(c => c.power.toLowerCase().includes(power.toLowerCase()));
    }

    // Apply sorting
    if (sort) {
        const [field, order] = sort.split(':');
        results.sort((a, b) => {
            return order === 'desc' 
                ? b[field].localeCompare(a[field])
                : a[field].localeCompare(b[field]);
        });
    }

    // Apply pagination
    if (limit) {
        results = results.slice(0, parseInt(limit));
    }

    if (results.length === 0) {
        return res.status(404).json({ message: "No characters found matching your criteria" });
    }

    res.json({
        count: results.length,
        data: results
    });
});

// GET single character
app.get('/characters/:id', (req, res) => {
    const character = characters.find(c => c.id === parseInt(req.params.id));
    if (!character) {
        return res.status(404).json({ message: "Character not found" });
    }
    res.json({
        data: character
    });
});

// POST new character
app.post('/characters', (req, res) => {
    const newCharacter = {
        id: characters.length + 1,
        name: req.body.name,
        anime: req.body.anime,
        power: req.body.power
    };
    
    characters.push(newCharacter);
    res.status(201).json({
        message: "Character created successfully",
        data: newCharacter
    });
});

// Add after your existing POST route

app.post('/characters/bulk', (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Request body must be an array of characters" });
    }

    const newCharacters = req.body.map((char, index) => ({
        id: characters.length + index + 1,
        name: char.name,
        anime: char.anime,
        power: char.power
    }));

    characters.push(...newCharacters);
    res.status(201).json({
        message: `${newCharacters.length} characters created successfully`,
        data: newCharacters
    });
});

// Bonus: PUT update character
app.put('/characters/:id', (req, res) => {
    const character = characters.find(c => c.id === parseInt(req.params.id));
    if (!character) {
        return res.status(404).json({ message: "Character not found" });
    }

    character.name = req.body.name || character.name;
    character.anime = req.body.anime || character.anime;
    character.power = req.body.power || character.power;

    res.json({
        message: "Character updated successfully",
        data: character
    });
});

// Bonus: DELETE character
app.delete('/characters/:id', (req, res) => {
    const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex === -1) {
        return res.status(404).json({ message: "Character not found" });
    }

    characters.splice(characterIndex, 1);
    res.json({ message: "Character deleted successfully" });
});

// Bulk delete characters
app.delete('/characters', (req, res) => {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ message: "Please provide an array of IDs" });
    }
    
    const initialLength = characters.length;
    characters = characters.filter(c => !ids.includes(c.id));
    
    res.json({
        message: `${initialLength - characters.length} characters deleted successfully`
    });
});

// Replace your existing stats route

app.get('/stats', (req, res) => {
    const stats = {
        totalCharacters: characters.length,
        animeCount: new Set(characters.map(c => c.anime)).size,
        charactersByAnime: characters.reduce((acc, char) => {
            acc[char.anime] = (acc[char.anime] || 0) + 1;
            return acc;
        }, {}),
        powerDistribution: characters.reduce((acc, char) => {
            acc[char.power] = (acc[char.power] || 0) + 1;
            return acc;
        }, {}),
        mostPopularAnime: Object.entries(characters.reduce((acc, char) => {
            acc[char.anime] = (acc[char.anime] || 0) + 1;
            return acc;
        }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
    };
    
    res.json({ data: stats });
});

// Add this at the bottom before app.listen
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});