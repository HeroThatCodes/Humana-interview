const cardGrid = document.getElementById('card-grid');
const addCardBtn = document.getElementById('add-card-btn');
const clearBoardBtn = document.getElementById('clear-board-btn');

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon?limit=600';

let pokemonData = [];

// Fetch data from PokeAPI
async function fetchPokemonData() {
    try {
        const response = await fetch(pokeAPI);
        const data = await response.json();
        const promises = data.results.map(result => fetch(result.url).then(res => res.json()));
        pokemonData = await Promise.all(promises);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}

let seed = Date.now();
function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
}

function getRandomIndex(max) {
    let rand = random();
    return Math.abs((rand * max) | 0);
}

function createCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';
    card.appendChild(header);

    const name = document.createElement('h3');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    header.appendChild(name);

    const hp = document.createElement('div');
    hp.className = 'hp';
    hp.textContent = `HP: ${pokemon.stats[0].base_stat}`;
    header.appendChild(hp);

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    card.appendChild(img);

    const stats = document.createElement('div');
    stats.className = 'stats';
    
    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon.height}`;
    height.className = 'stat-height';
    stats.appendChild(height);

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight}`;
    weight.className = 'stat-weight';
    stats.appendChild(weight);

    const attack = document.createElement('p');
    attack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
    attack.className = 'stat-attack';
    stats.appendChild(attack);

    const defense = document.createElement('p');
    defense.textContent = `Defense: ${pokemon.stats[2].base_stat}`;
    defense.className = 'stat-defense';
    stats.appendChild(defense);

    card.appendChild(stats);

    return card;
}

function addRandomCard() {
    if (pokemonData.length === 0) {
        console.error('Pokemon data is not loaded yet.');
        return;
    }
    const randomIndex = getRandomIndex(pokemonData.length);
    const randomPokemon = pokemonData[randomIndex];
    const card = createCard(randomPokemon);
    cardGrid.appendChild(card);
}

function clearBoard() {
    cardGrid.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        setTimeout(addRandomCard, i * 300);
    }
}

addCardBtn.addEventListener('click', addRandomCard);
clearBoardBtn.addEventListener('click', clearBoard);

// Fetch the Pokemon data when the script loads
fetchPokemonData();




